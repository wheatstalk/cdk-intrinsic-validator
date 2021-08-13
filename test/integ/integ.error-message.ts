import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '../../src';
import { TestLambdas } from './test-lambdas';

/** @internal */
export class IntegErrorMessage extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegErrorMessage', props);

    const testLambdas = new TestLambdas(this, 'TestLambdas');

    new IntrinsicValidator(this, 'IntrinsicValidator', {
      validations: [
        // Invoke the given Lambda function. If the function fails, the deployment
        // will be cancelled and rolled back.
        Validation.lambdaInvokeSucceeds({
          label: 'Check That Error Messages Show',
          lambdaFunction: testLambdas.alwaysFails,
          // Uncomment the next line and comment the above if you want to
          // deploy this stack without an error so you can iterate faster.
          // lambdaFunction: testLambdas.alwaysSucceeds,
        }),
      ],
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegErrorMessage(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
