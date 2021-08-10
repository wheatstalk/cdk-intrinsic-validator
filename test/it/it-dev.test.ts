import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DisableRandomnessContextKey } from '../../src';
import { ItDev } from '../../src/it/it-dev';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new ItDev(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});