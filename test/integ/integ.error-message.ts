import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import {
  FargateValidationFactory,
  IntrinsicValidator,
  // @ts-ignore
  Validation,
} from '../../src';
import { SingletonAlarmMonitor } from '../../src/alarm-monitor';
import { TestAlarms } from './test-alarms';
import { TestLambdas } from './test-lambdas';

/** @internal */
export class IntegErrorMessage extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps = {}) {
    super(scope, 'IntegErrorMessage', props);

    const cluster = new ecs.Cluster(this, 'Cluster');

    // @ts-ignore
    const testLambdas = new TestLambdas(this, 'TestLambdas');
    // @ts-ignore
    const testAlarms = new TestAlarms(this, 'TestAlarms');
    // @ts-ignore
    const factory = new FargateValidationFactory(this, 'FargateValidationFactory', {
      cluster,
    });

    // Pre-populate this so it's faster to deploy when you uncomment the
    // monitorAlarm validation.
    // @ts-ignore
    const monitor = new SingletonAlarmMonitor(this, 'AlarmMonitor');

    new IntrinsicValidator(this, 'IntrinsicValidator', {
      validations: [
        // Uncomment any of the following to test their failure messages:

        // factory.runContainer({
        //   image: ecs.ContainerImage.fromRegistry('alpine:3'),
        //   command: ['sh', '-c', 'exit 1'],
        // }),

        // Validation.lambdaInvokeSucceeds({
        //   label: 'Check That Error Messages Show',
        //   lambdaFunction: testLambdas.alwaysFails,
        // }),

        // Validation.monitorAlarm({
        //   alarm: testAlarms.alwaysAlarming,
        //   duration: cdk.Duration.seconds(10),
        // }),

        // Validation.stateMachineExecutionSucceeds({
        //   stateMachine: monitor.stateMachine,
        //   input: monitor.createTaskInput({
        //     alarm: testAlarms.alwaysAlarming,
        //     duration: cdk.Duration.seconds(10),
        //   }),
        // }),
      ],
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegErrorMessage(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
