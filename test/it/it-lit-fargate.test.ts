import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItLitFargate } from '../../src/it/it-lit-fargate';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItLitFargate(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});