import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegHttpCheckLit extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegHttpCheckLit', props);

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        Validation.httpCheck({
          // Replace this URL with a public endpoint of your own
          url: 'https://httpstat.us/200',
          // (optional) Check the page content for a node-compatible regex
          checkPattern: '\\d+\\s+OK',
          // (optional) Provide regex flags
          checkPatternFlags: 'i',
        }),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegHttpCheckLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
