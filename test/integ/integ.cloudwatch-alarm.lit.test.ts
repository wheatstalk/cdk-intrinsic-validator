import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { DisableRandomnessContextKey } from '../../src';
import { IntegCloudwatchAlarmLit } from './integ.cloudwatch-alarm.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegCloudwatchAlarmLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});