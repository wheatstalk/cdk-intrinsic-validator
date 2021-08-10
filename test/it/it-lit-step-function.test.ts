import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItLitStepFunction } from '../../src/it/it-lit-step-function';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItLitStepFunction(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});