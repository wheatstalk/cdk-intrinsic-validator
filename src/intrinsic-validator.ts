import * as path from 'path';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as nodejs from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as sfn_tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

/**
 * Props for `IntrinsicValidator`
 */
export interface IntrinsicValidatorProps {
  /**
   * Validations to run every time the stack is deployed.
   * @default - no validations are run
   */
  readonly validations?: Validation[];
}

/**
 * Adds intrinsic validation to a CloudFormation stack so that when one of the
 * given validations fails, the stack will automatically roll back.
 */
export class IntrinsicValidator extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: IntrinsicValidatorProps) {
    super(scope, id);

    const parallel = new sfn.Parallel(this, 'Validations');

    let validationIndex = 0;
    for (const validation of props.validations ?? []) {
      const config = validation._bind(parallel, `Branch${validationIndex}`);
      parallel.branch(config.chainable);
      validationIndex++;
    }

    const stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      definition: parallel,
    });

    const entry = path.join(__dirname, 'intrinsic-validator.provider.ts');
    const onEventHandler = new nodejs.NodejsFunction(this, 'OnEventHandler', {
      entry,
      handler: 'onEventHandler',
      environment: {
        STATE_MACHINE_ARN: stateMachine.stateMachineArn,
      },
    });
    stateMachine.grantStartExecution(onEventHandler);

    const isCompleteHandler = new nodejs.NodejsFunction(this, 'IsCompleteHandler', {
      entry,
      handler: 'isCompleteHandler',
      environment: {
        STATE_MACHINE_ARN: stateMachine.stateMachineArn,
      },
    });
    stateMachine.grantRead(isCompleteHandler);

    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler,
      isCompleteHandler,
      logRetention: logs.RetentionDays.ONE_MONTH,
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

  /** @internal */
  abstract _bind(scope: cdk.Construct, id: string): ValidationConfig;
}

/** @internal */
class AlwaysSucceeds extends Validation {
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
  _bind(scope: cdk.Construct, id: string): ValidationConfig {
    return {
      chainable: new sfn.Fail(scope, id),
    };
  }
}

/**
 * Base options for Fargate-based validations.
 */
export interface FargateValidationBaseOptions {
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
    super();
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
 * Creates a convenient factory for Fargate-based validations. The given props
 * applied as defaults for all produced Fargate validations.
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
   * @param image The ECS container image to run
   * @param command The command to run in the container
   */
  runContainer(image: ecs.ContainerImage, ...command: string[]): Validation {
    const taskDefinition = new ecs.FargateTaskDefinition(this, this.obtainTaskDefinitionId(), {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    taskDefinition.addContainer('script', {
      image,
      command: command,
    });

    return Validation.fargateTaskSucceeds({
      ...this.options,
      securityGroups: this.securityGroups,
      taskDefinition,
    });
  }


}