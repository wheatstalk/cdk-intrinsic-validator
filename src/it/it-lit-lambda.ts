import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '..';
import { TestLambdas } from './test-lambdas';

/** @internal */
export class ItLitLambda extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'ItLitLambda', props);

    const testLambdas = new TestLambdas(this, 'TestLambdas');
    const lambdaFunction = testLambdas.alwaysSucceeds;

    // Lit code uses 'scope'
    const scope = this;

    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Invoke the given Lambda function. If the function fails, the deployment
        // will be cancelled and rolled back.
        Validation.lambdaInvokeSucceeds({
          lambdaFunction,
        }),
      ],
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItLitLambda(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
