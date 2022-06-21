import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DisableRandomnessContextKey } from '../../src';
import { IntegMainLit } from './integ.main.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegMainLit(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});