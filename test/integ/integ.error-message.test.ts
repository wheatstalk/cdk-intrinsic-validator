import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IntegErrorMessage } from './integ.error-message';
import { DisableRandomnessContextKey } from '../../src';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegErrorMessage(app);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});