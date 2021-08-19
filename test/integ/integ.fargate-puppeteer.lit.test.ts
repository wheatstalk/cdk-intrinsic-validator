import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { IntegFargatePuppeteer } from './integ.fargate-puppeteer.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegFargatePuppeteer(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});