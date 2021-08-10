import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItAlarmMonitor } from '../../src/it/it-alarm-monitor';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItAlarmMonitor(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});