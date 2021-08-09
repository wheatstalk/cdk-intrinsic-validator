import * as cdk from '@aws-cdk/core';
import { AlarmMonitor } from '../alarm-monitor';
import { TestAlarms } from './test-alarms';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'AlarmMonitor', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new AlarmMonitor(stack, 'AlarmMonitor');
new TestAlarms(stack, 'TestAlarms');

// Submit the JSON for the Test Alarms to the state machine to test this thing.