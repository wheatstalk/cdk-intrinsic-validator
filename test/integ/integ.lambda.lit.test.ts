import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { IntegLambdaLit } from './integ.lambda.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegLambdaLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});