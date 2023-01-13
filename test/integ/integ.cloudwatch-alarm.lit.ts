import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TestAlarms } from './test-alarms';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegCloudwatchAlarmLit extends cdk.Stack {
  constructor(scope_: Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegCloudwatchAlarmLit', props);

    const testAlarms = new TestAlarms(this, 'TestAlarms');
    const alarm = testAlarms.compositeNeverAlarming;

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
          duration: cdk.Duration.minutes(1),
        }),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegCloudwatchAlarmLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
