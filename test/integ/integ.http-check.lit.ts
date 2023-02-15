import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegHttpCheckLit extends cdk.Stack {
  constructor(scope_: Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegHttpCheckLit', props);

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        Validation.httpCheck({
          // Replace this URL with a public endpoint of your own
          url: 'https://httpstat.us/200',
          // (optional) Expect an http 200 status
          expectedStatus: '200',
          // (optional) Ignore http 4xx or 502 statuses and retry the check up to the timeout
          retryStatus: '400-499,502',
          // (optional) Try for up to 14 minutes
          timeout: Duration.minutes(14),
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
