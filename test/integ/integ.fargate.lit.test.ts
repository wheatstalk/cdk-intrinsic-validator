import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { DisableRandomnessContextKey } from '../../src';
import { IntegFargateLit } from './integ.fargate.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegFargateLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});