import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IntegAlarmMonitor } from './integ.alarm-monitor';
import { DisableRandomnessContextKey } from '../../src';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegAlarmMonitor(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});