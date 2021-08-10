import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItLitLambda } from '../../src/it/it-lit-lambda';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItLitLambda(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});