import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '..';
import { TestAlarms } from './test-alarms';

/** @internal */
export class ItLitCloudwatchAlarm extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'ItLitCloudwatchAlarm', props);

    const testAlarms = new TestAlarms(this, 'TestAlarms');
    const alarm = testAlarms.neverAlarming;

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Monitor the given alarm for five minutes before allowing the deployment
        // to complete. If the alarm starts sounding while intrinsic validation is
        // monitoring it, the stack will roll back automatically.
        Validation.monitorAlarm({
          alarm,
          duration: cdk.Duration.minutes(5),
        }),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItLitCloudwatchAlarm(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
