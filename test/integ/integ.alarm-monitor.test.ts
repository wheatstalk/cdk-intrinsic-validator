import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { DisableRandomnessContextKey } from '../../src';
import { IntegAlarmMonitor } from './integ.alarm-monitor';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegAlarmMonitor(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});