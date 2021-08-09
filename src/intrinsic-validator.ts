import * as path from 'path';
import * as cw from '@aws-cdk/aws-cloudwatch';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as sfn_tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';
import { SingletonAlarmMonitor } from './alarm-monitor';

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

/**
 * Adds intrinsic validation to a CloudFormation stack.
 */
export class IntrinsicValidator extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: IntrinsicValidatorProps = {}) {
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

    const code = lambda.Code.fromAsset(path.join(__dirname, '..', 'lambda'));
    const runtime = lambda.Runtime.NODEJS_14_X;
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
    const randomness = Math.round(Math.random() * 10000000);
    new cdk.CustomResource(this, `Resource${randomness}`, {
      serviceToken: provider.serviceToken,
    });
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
   * Create a validation that monitors an alarm.
   */
  static monitorAlarm(options: MonitorAlarmOptions): Validation {
    return new MonitorAlarm(options);
  }

  /** @internal */
  readonly _label: string;

  /** @internal */
  protected constructor(options: ValidationBaseOptions) {
    this._label = options.label ?? 'Unlabelled';
  }

  /** @internal */
  abstract _bind(scope: cdk.Construct, id: string): ValidationConfig;
}

/** @internal */
class AlwaysSucceeds extends Validation {
  constructor() {
    super({ label: 'AlwaysSucceeds' });
  }

  _bind(scope: cdk.Construct, id: string): ValidationConfig {
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

  _bind(scope: cdk.Construct, id: string): ValidationConfig {
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

  _bind(scope: cdk.Construct, id: string): ValidationConfig {
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
export class FargateValidationFactory extends cdk.Construct {
  private readonly options: FargateValidationFactoryProps;
  private readonly securityGroups: ec2.ISecurityGroup[];
  private taskDefinitionIndex = -1;

  constructor(scope: cdk.Construct, id: string, props: FargateValidationFactoryProps) {
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

  _bind(scope: cdk.Construct, id: string): ValidationConfig {
    const privateScope = new cdk.Construct(scope, id);
    const alarmMonitor = new SingletonAlarmMonitor(privateScope, 'AlarmMonitor');

    const chainable = new sfn_tasks.StepFunctionsStartExecution(privateScope, id, {
      stateMachine: alarmMonitor.stateMachine,
      input: alarmMonitor.createTaskInput({
        alarm: this.alarm,
        duration: this.timeout,
      }),
      integrationPattern: sfn.IntegrationPattern.RUN_JOB,
    });

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

  _bind(scope: cdk.Construct, id: string): ValidationConfig {
    const chainable = new sfn_tasks.StepFunctionsStartExecution(scope, id, {
      stateMachine: this.options.stateMachine,
      input: this.options.input,
      integrationPattern: sfn.IntegrationPattern.RUN_JOB,
    });

    return {
      chainable,
    };
  }
}