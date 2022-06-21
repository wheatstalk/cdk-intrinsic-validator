import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DisableRandomnessContextKey } from '../../src';
import { IntegDev } from './integ.dev';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegDev(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});