import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IntegFargateLit } from './integ.fargate.lit';
import { DisableRandomnessContextKey } from '../../src';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegFargateLit(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});