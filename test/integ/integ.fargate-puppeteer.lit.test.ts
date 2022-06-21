import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DisableRandomnessContextKey } from '../../src';
import { IntegFargatePuppeteer } from './integ.fargate-puppeteer.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegFargatePuppeteer(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});