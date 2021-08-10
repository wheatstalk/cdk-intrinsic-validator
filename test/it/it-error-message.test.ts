import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItErrorMessage } from '../../src/it/it-error-message';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItErrorMessage(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});