import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as cw from 'aws-cdk-lib/aws-cloudwatch';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfn_tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { SingletonAlarmMonitor } from './alarm-monitor';
import { LAMBDA_ASSET_DIR } from './assets';
import { HttpCheckRequest } from './lambda/http-check/lambda';
import { compilePortSpec } from './port-spec';

/**
 * Props for `IntrinsicValidator`
 */
export interface IntrinsicValidatorProps {
  /**
   * Name the Step Functions State Machine.
   * @default - CDK automatically picks a name
   */
  readonly stateMachineName?: string;

  /**
   * Validations to run every time the stack is deployed.
   * @default - no validations are run
   */
  readonly validations?: Validation[];
}

/** @internal */
export const DisableRandomnessContextKey = 'intrinsic-validator.disable-randomness';

/**
 * Adds intrinsic validation to a CloudFormation stack.
 */
export class IntrinsicValidator extends Construct {
  constructor(scope: Construct, id: string, props: IntrinsicValidatorProps = {}) {
    super(scope, id);

    const definition = new sfn.Parallel(this, 'Validations');

    let validationIndex = 0;
    const validations = props.validations ?? [];
    for (const validation of validations) {
      const config = validation._bind(definition, `[${validationIndex}] ${validation._label}`);
      definition.branch(config.chainable);
      validationIndex++;
    }

    if (validations.length === 0) {
      const noValidationsPass = new sfn.Pass(this, 'NoValidations', {
        result: sfn.Result.fromString('Disabled'),
      });
      definition.branch(noValidationsPass);
    }

    const stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      stateMachineName: props.stateMachineName,
      definition,
    });

    const code = lambda.Code.fromAsset(LAMBDA_ASSET_DIR);
    const runtime = lambda.Runtime.NODEJS_LATEST;
    const logRetention = logs.RetentionDays.ONE_MONTH;

    const onEventHandler = new lambda.Function(this, 'OnEventHandler', {
      runtime,
      code,
      logRetention,
      handler: 'intrinsic-validator-provider.onEventHandler',
      environment: {
        STATE_MACHINE_ARN: stateMachine.stateMachineArn,
      },
    });
    stateMachine.grantStartExecution(onEventHandler);

    const isCompleteHandler = new lambda.Function(this, 'IsCompleteHandler', {
      runtime,
      code,
      logRetention,
      handler: 'intrinsic-validator-provider.isCompleteHandler',
      environment: {
        STATE_MACHINE_ARN: stateMachine.stateMachineArn,
      },
    });
    stateMachine.grantRead(isCompleteHandler);

    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler,
      isCompleteHandler,
      logRetention,
    });

    // Create a new logical resource every time we deploy. This is how we cause
    // the validation to be run on every deployment.
    const customResourceId = this.getCustomResourceId();
    new cdk.CustomResource(this, customResourceId, {
      serviceToken: provider.serviceToken,
    });
  }

  /**
   * Get the custom resource ID.
   *
   * It's usually random-suffixed, but it can be turned off by providing a
   * context. Randomness is disabled in the tests so that the snapshots
   * can be stable.
   */
  private getCustomResourceId() {
    const shouldDisableRandomness = Boolean(this.node.tryGetContext(DisableRandomnessContextKey));
    return shouldDisableRandomness
      ? 'Resource'
      : `Resource${(Math.round(Math.random() * 10000000))}`;
  }
}


/** @internal */
export interface ValidationConfig {
  readonly chainable: sfn.IChainable;
}

/**
 * Create many types of validations.
 */
export abstract class Validation {
  /**
   * Create a validation that always succeeds.
   */
  static alwaysSucceeds(): Validation {
    return new AlwaysSucceeds();
  }

  /**
   * Create a validation that always fails.
   */
  static alwaysFails(): Validation {
    return new AlwaysFails();
  }

  /**
   * Create a validation that runs a fargate task and waits for it to succeed.
   */
  static fargateTaskSucceeds(options: FargateTaskSucceedsOptions): Validation {
    return new FargateTaskSucceeds(options);
  }

  /**
   * Create a validation that executes a Step Functions state machine.
   */
  static stateMachineExecutionSucceeds(options: StateMachineExecutionSucceedsOptions): Validation {
    return new StateMachineExecutionSucceeds(options);
  }

  /**
   * Create a validation that invokes a lambda function.
   */
  static lambdaInvokeSucceeds(options: LambdaInvokeSucceedsOptions): Validation {
    return new LambdaInvokeSucceeds(options);
  }

  /**
   * Create a validation that monitors an alarm.
   */
  static monitorAlarm(options: MonitorAlarmOptions): Validation {
    return new MonitorAlarm(options);
  }

  /**
   * Create a validation that checks
   */
  static httpCheck(param: HttpCheckSucceedsOptions): Validation {
    return new HttpCheck(param);
  }

  /** @internal */
  readonly _label: string;

  /** @internal */
  protected constructor(options: ValidationBaseOptions) {
    this._label = options.label ?? 'Unlabelled';
  }

  /** @internal */
  abstract _bind(scope: Construct, id: string): ValidationConfig;
}

/** @internal */
class AlwaysSucceeds extends Validation {
  constructor() {
    super({ label: 'AlwaysSucceeds' });
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    return {
      chainable: new sfn.Pass(scope, id, {
        result: sfn.Result.fromString('Winner'),
      }),
    };
  }
}

/** @internal */
class AlwaysFails extends Validation {
  constructor() {
    super({ label: 'AlwaysFails' });
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    return {
      chainable: new sfn.Fail(scope, id),
    };
  }
}

/**
 * Base options for validations
 */
export interface ValidationBaseOptions {
  /**
   * Label references to this validation for easier identification.
   * @default - Automatic label based on the validation type
   */
  readonly label?: string;
}

/**
 * Base options for Fargate-based validations.
 */
export interface FargateValidationBaseOptions extends ValidationBaseOptions {
  /**
   * The cluster to create the task on.
   */
  readonly cluster: ecs.ICluster;

  /**
   * Container overrides.
   */
  readonly containerOverrides?: sfn_tasks.ContainerOverride[];

  /**
   * Select subnets in which tasks will run.
   */
  readonly subnets?: ec2.SubnetSelection;

  /**
   * Give tasks a security group.
   */
  readonly securityGroups?: ec2.ISecurityGroup[];

  /**
   * Assign tasks public IP addresses.
   */
  readonly assignPublicIp?: boolean;
}

/**
 * Options for Fargate task validations.
 */
export interface FargateTaskSucceedsOptions extends FargateValidationBaseOptions {
  readonly taskDefinition: ecs.TaskDefinition;
}

/** @internal */
class FargateTaskSucceeds extends Validation {
  constructor(private readonly options: FargateTaskSucceedsOptions) {
    super({
      label: options.label ?? 'FargateTaskSucceeds',
    });
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    return {
      chainable: new sfn_tasks.EcsRunTask(scope, id, {
        launchTarget: new sfn_tasks.EcsFargateLaunchTarget(),
        ...this.options,
        integrationPattern: sfn.IntegrationPattern.RUN_JOB,
      }),
    };
  }
}

/**
 * Props for `FargateValidationFactory`
 */
export interface FargateValidationFactoryProps extends FargateValidationBaseOptions {
}

/**
 * Base options for running containers.
 */
export interface FargateValidationRunContainerOptions extends ValidationBaseOptions {
  /**
   * Container image to run.
   */
  readonly image: ecs.ContainerImage;

  /**
   * Run this container command.
   * @default - use the image's default.
   */
  readonly command?: string[];
}

/**
 * A convenience tool for creating Fargate-based validations.
 */
export class FargateValidationFactory extends Construct {
  private readonly options: FargateValidationFactoryProps;
  private readonly securityGroups: ec2.ISecurityGroup[];
  private taskDefinitionIndex = -1;

  constructor(scope: Construct, id: string, props: FargateValidationFactoryProps) {
    super(scope, id);
    this.options = props;
    // By default, no security group.
    this.securityGroups = props.securityGroups ?? [];
  }

  private obtainTaskDefinitionId() {
    this.taskDefinitionIndex += 1;
    return `TaskDefinition${this.taskDefinitionIndex}`;
  }

  /**
   * Produce a validation that uses a container image to run a command.
   */
  runContainer(options: FargateValidationRunContainerOptions): Validation {
    const taskDefinition = new ecs.FargateTaskDefinition(this, this.obtainTaskDefinitionId(), {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    taskDefinition.addContainer('script', {
      image: options.image,
      command: options.command,
    });

    // Use the given label over the factory's default label.
    const label = options.label ?? this.options.label;

    return Validation.fargateTaskSucceeds({
      ...this.options,
      label: label,
      securityGroups: this.securityGroups,
      taskDefinition,
    });
  }
}

/**
 * Options for monitoring alarms.
 */
export interface MonitorAlarmOptions extends ValidationBaseOptions {
  /**
   * The alarm to monitor.
   */
  readonly alarm: cw.IAlarm;

  /**
   * The length of time to monitor the alarm.
   * @default - one minute
   */
  readonly duration?: cdk.Duration;
}

class MonitorAlarm extends Validation {
  private readonly alarm: cw.IAlarm;
  private readonly timeout: cdk.Duration;

  constructor(options: MonitorAlarmOptions) {
    super({
      label: options.label ?? 'MonitorAlarm',
    });

    this.alarm = options.alarm;
    this.timeout = options.duration ?? cdk.Duration.minutes(1);
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    const privateScope = new Construct(scope, id);
    const alarmMonitor = new SingletonAlarmMonitor(privateScope, 'AlarmMonitor');

    const chainable = new sfn_tasks.StepFunctionsStartExecution(privateScope, id, {
      stateMachine: alarmMonitor.stateMachine,
      input: alarmMonitor.createTaskInput({
        alarm: this.alarm,
        duration: this.timeout,
      }),
      integrationPattern: sfn.IntegrationPattern.RUN_JOB,
    });

    const failureMessage = new sfn.Fail(privateScope, `${id} - Alarming`, {
      error: 'Alarm',
      cause: `${this.alarm.alarmName} is alarming`,
    });

    chainable.addCatch(failureMessage);

    return {
      chainable,
    };
  }
}

/**
 * Options for step function validations
 */
export interface StateMachineExecutionSucceedsOptions extends ValidationBaseOptions {
  /** The state machine to execute */
  readonly stateMachine: sfn.IStateMachine;

  /**
   * Input for the state machine's execution
   * @default - no input given
   */
  readonly input?: sfn.TaskInput;
}

class StateMachineExecutionSucceeds extends Validation {
  constructor(private readonly options: StateMachineExecutionSucceedsOptions) {
    super({
      label: options.label ?? 'StateMachineExecutionSucceeds',
    });
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    const chainable = new sfn_tasks.StepFunctionsStartExecution(scope, id, {
      stateMachine: this.options.stateMachine,
      input: this.options.input,
      integrationPattern: sfn.IntegrationPattern.RUN_JOB,
    });

    const failureMessage = new sfn.Fail(chainable, `${id} - Alarming`, {
      error: 'ExecutionFailed',
      cause: `${this.options.stateMachine.stateMachineArn} failed to execute`,
    });

    chainable.addCatch(failureMessage);

    return {
      chainable,
    };
  }
}

/**
 * Options for lambda validations
 */
export interface LambdaInvokeSucceedsOptions extends ValidationBaseOptions {
  /**
   * The Lambda function to invoke.
   *
   * If there's an error, throw from within your function.
   */
  readonly lambdaFunction: lambda.IFunction;
}

class LambdaInvokeSucceeds extends Validation {
  private readonly lambdaFunction: lambda.IFunction;

  constructor(options: LambdaInvokeSucceedsOptions) {
    super({ label: options.label ?? 'LambdaInvokeSucceeds' });

    this.lambdaFunction = options.lambdaFunction;
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    const chainable = new sfn_tasks.LambdaInvoke(scope, id, {
      integrationPattern: sfn.IntegrationPattern.REQUEST_RESPONSE,
      lambdaFunction: this.lambdaFunction,
    });

    return {
      chainable,
    };
  }
}

export interface HttpCheckSucceedsOptions extends ValidationBaseOptions {
  /**
   * URL to check
   */
  readonly url: string;

  /**
   * Maximum time to wait for a response.
   * @default Duration.seconds(3)
   */
  readonly timeout?: cdk.Duration;

  /**
   * Expect an HTTP status
   * @default 200
   */
  readonly expectedStatus?: number | string;

  /**
   * Retry the check if the given http status is resolved.
   * @default - no retries
   */
  readonly retryStatus?: string;

  /**
   * Continue to retry the check until the timeout is reached.
   * @default false
   */
  readonly retryUntilTimeout?: boolean;

  /**
   * Follow redirects when performing the check
   * @default false
   */
  readonly followRedirects?: boolean;

  /**
   * Check the response body of the URL for this Node-compatible regex pattern.
   * @default - Only HTTP status is checked
   */
  readonly checkPattern?: string;

  /**
   * Regex pattern flags.
   * @default - No flags
   */
  readonly checkPatternFlags?: string;
}

class HttpCheck extends Validation {
  private readonly url: string;
  private readonly expectedStatus: string;
  private readonly timeout: cdk.Duration;
  private readonly checkPattern?: string;
  private readonly checkPatternFlags?: string;
  private readonly followRedirects: boolean;
  private readonly retryStatus?: string;
  private readonly retryUntilTimeout: boolean;

  constructor(options: HttpCheckSucceedsOptions) {
    super({ label: options.label ?? 'Http Check Succeeds' });

    this.url = options.url;
    this.expectedStatus = options.expectedStatus?.toString() ?? '200';
    this.timeout = options.timeout ?? cdk.Duration.seconds(3);
    this.followRedirects = options.followRedirects ?? false;
    this.retryStatus = options.retryStatus;
    this.retryUntilTimeout = options.retryUntilTimeout ?? false;

    // Test expectStatus is valid syntax
    compilePortSpec(this.expectedStatus);

    if (this.retryStatus) {
      // Test retryStatus is valid syntax
      compilePortSpec(this.retryStatus);
    }

    if (options.checkPattern) {
      // Check that the given pattern and flags are valid before we use them.
      new RegExp(options.checkPattern, options.checkPatternFlags);
      this.checkPattern = options.checkPattern;
      this.checkPatternFlags = options.checkPatternFlags;
    }

    if (this.timeout.toMinutes({ integral: false }) > 14) {
      throw new Error('Timeout is too long. Please keep it under 14 minutes. If you need longer, try a step function.');
    }
  }

  _bind(scope: Construct, id: string): ValidationConfig {
    const privateScope = new Construct(scope, id);

    const lambdaFunction = new lambda.SingletonFunction(privateScope, 'Function', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      uuid: 'http-check.handler',
      handler: 'http-check.handler',
      code: lambda.Code.fromAsset(path.join(LAMBDA_ASSET_DIR)),
      timeout: cdk.Duration.minutes(15),
    });

    const httpCheckRequest: HttpCheckRequest = {
      url: this.url,
      expectedStatus: this.expectedStatus,
      retryStatus: this.retryStatus,
      retryUntilTimeout: this.retryUntilTimeout,
      followRedirects: this.followRedirects,
      timeout: this.timeout.toSeconds() * 1000,
      checkPattern: this.checkPattern,
      checkPatternFlags: this.checkPatternFlags,
    };

    const chainable = new sfn_tasks.LambdaInvoke(privateScope, id, {
      lambdaFunction,
      payload: sfn.TaskInput.fromObject(httpCheckRequest),
      payloadResponseOnly: true,
    });

    return {
      chainable,
    };
  }
}
