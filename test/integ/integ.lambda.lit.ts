import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TestLambdas } from './test-lambdas';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegLambdaLit extends cdk.Stack {
  constructor(scope_: Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegLambdaLit', props);

    const testLambdas = new TestLambdas(this, 'TestLambdas');
    const lambdaFunction = testLambdas.alwaysSucceeds;

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Invoke the given Lambda function. If the function fails, the deployment
        // will be cancelled and rolled back.
        Validation.lambdaInvokeSucceeds({
          lambdaFunction,
        }),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegLambdaLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
