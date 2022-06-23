import * as cdk from 'aws-cdk-lib';
import * as cw from 'aws-cdk-lib/aws-cloudwatch';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfn_tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { LAMBDA_ASSET_DIR } from './assets';

/**
 * A CloudWatch alarm monitor.
 */
export interface IAlarmMonitor {
  /**
   * The Step Functions state machine.
   */
  readonly stateMachine: sfn.IStateMachine;

  /**
   * Create input for a state machine execution.
   */
  createTaskInput(options: AlarmMonitorTaskInputOptions): sfn.TaskInput;
}

/**
 * Task input options.
 */
export interface AlarmMonitorTaskInputOptions {
  /** The alarm to monitor */
  readonly alarm: cw.IAlarm;
  /** The maximum duration to monitor */
  readonly duration: cdk.Duration;
}

/**
 * Provides a State Machine to monitor CloudWatch Alarms.
 */
export class AlarmMonitor extends Construct implements IAlarmMonitor {
  readonly stateMachine: sfn.IStateMachine;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bugState = new sfn.Fail(this, 'BugState');

    const checkAlarmStatusFunction = new lambda.Function(this, 'CheckAlarmStatusFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'check-alarm-status.handler',
      code: lambda.Code.fromAsset(LAMBDA_ASSET_DIR),
      logRetention: logs.RetentionDays.ONE_MONTH,
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['cloudwatch:DescribeAlarms'],
          resources: ['*'],
        }),
      ],
    });

    const checkAlarmStatus = new sfn_tasks.LambdaInvoke(this, 'CheckAlarmStatus', {
      integrationPattern: sfn.IntegrationPattern.REQUEST_RESPONSE,
      lambdaFunction: checkAlarmStatusFunction,
      payload: sfn.TaskInput.fromObject({
        'AlarmName.$': '$.AlarmName',
        'MonitoringDurationSeconds.$': '$.MonitoringDurationSeconds',
        'StartTime.$': '$$.Execution.StartTime',
      }),
      resultPath: '$.CheckAlarmStatus',
      resultSelector: {
        'Status.$': '$.Payload.Status',
      },
    });

    checkAlarmStatus.addCatch(bugState);
    checkAlarmStatus.addRetry({ maxAttempts: 3 });

    const alarmStatusChoice = new sfn.Choice(this, 'AlarmStatusChoice');
    const delayForNextCheckStatus = new sfn.Wait(this, 'DelayThenNextCheckStatus', {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(30)),
    });
    const failBecauseAlarming = new sfn.Fail(this, 'FailBecauseAlarming');
    const noAlarm = new sfn.Succeed(this, 'NoAlarm');

    const definition = sfn.Chain.start(checkAlarmStatus)
      .next(alarmStatusChoice
        .when(
          sfn.Condition.stringEquals('$.CheckAlarmStatus.Status', 'ALARM'),
          failBecauseAlarming,
        )
        .when(
          sfn.Condition.stringEquals('$.CheckAlarmStatus.Status', 'MONITORING'),
          delayForNextCheckStatus
            .next(checkAlarmStatus),
        )
        .when(
          sfn.Condition.stringEquals('$.CheckAlarmStatus.Status', 'NO_ALARM'),
          noAlarm,
        )
        .otherwise(bugState),
      );

    this.stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      definition: definition,
    });
  }

  createTaskInput(options: AlarmMonitorTaskInputOptions): sfn.TaskInput {
    return sfn.TaskInput.fromObject({
      AlarmName: options.alarm.alarmName,
      MonitoringDurationSeconds: options.duration.toSeconds(),
    });
  }
}

/**
 * Creates or re-uses a singleton alarm monitor.
 */
export class SingletonAlarmMonitor extends Construct implements IAlarmMonitor {
  private readonly alarmMonitor: IAlarmMonitor;

  public get stateMachine(): sfn.IStateMachine {
    return this.alarmMonitor.stateMachine;
  }

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const stack = cdk.Stack.of(this);
    this.alarmMonitor = stack.node.tryFindChild('SingletonAlarmMonitor') as AlarmMonitor
      ?? new AlarmMonitor(stack, 'SingletonAlarmMonitor');
  }

  createTaskInput(options: AlarmMonitorTaskInputOptions): sfn.TaskInput {
    return this.alarmMonitor.createTaskInput(options);
  }
}