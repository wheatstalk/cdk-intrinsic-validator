import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { DisableRandomnessContextKey } from '../../src';
import { IntegMainLit } from './integ.main.lit';

test('snapshot', () => {
  const app = new cdk.App({
    context: {
      [DisableRandomnessContextKey]: true,
    },
  });

  const stack = new IntegMainLit(app);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});