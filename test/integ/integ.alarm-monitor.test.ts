import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DisableRandomnessContextKey } from '../../src';
import { IntegAlarmMonitor } from './integ.alarm-monitor';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegAlarmMonitor(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});