import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IntegHttpCheckLit } from './integ.http-check.lit';
import { DisableRandomnessContextKey } from '../../src';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegHttpCheckLit(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});