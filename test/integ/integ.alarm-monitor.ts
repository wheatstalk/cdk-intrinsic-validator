import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TestAlarms } from './test-alarms';
import { AlarmMonitor } from '../../src/alarm-monitor';

/** @internal */
export class IntegAlarmMonitor extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps = {}) {
    super(scope, 'IntegAlarmMonitor', props);

    new AlarmMonitor(this, 'AlarmMonitor');
    new TestAlarms(this, 'TestAlarms');

    // Submit the JSON for the Test Alarms to the state machine to test this thing.
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegAlarmMonitor(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
