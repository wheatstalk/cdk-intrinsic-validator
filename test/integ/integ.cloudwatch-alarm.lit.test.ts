import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IntegCloudwatchAlarmLit } from './integ.cloudwatch-alarm.lit';
import { DisableRandomnessContextKey } from '../../src';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegCloudwatchAlarmLit(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});