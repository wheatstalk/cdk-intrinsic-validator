import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { IntegStepFunctionLit } from './integ.step-function.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegStepFunctionLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});