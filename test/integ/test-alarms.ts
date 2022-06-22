import * as cw from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

/**
 * Create some test alarms.
 * @internal
 */
export class TestAlarms extends cdk.Construct {
  /** An alarm that is always in alarm */
  public readonly alwaysAlarming: cw.IAlarm;
  /** An alarm that is never in alarm */
  public readonly neverAlarming: cw.IAlarm;

  public readonly compositeAlwaysAlarming: cw.IAlarm;
  public readonly compositeNeverAlarming: cw.IAlarm;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    // Create some alarms
    const metric = new cw.Metric({
      metricName: 'EstimatedCharges',
      namespace: 'AWS/Billing',
      statistic: 'Maximum',
      dimensions: {
        Currency: 'USD',
      },
    }).with({
      period: cdk.Duration.hours(9),
    });

    // $99B AWS bill.
    const threshold = 99_999_999_999;
    const evaluationPeriods = 1;

    // This alarm should always alarm.
    this.alwaysAlarming = new cw.Alarm(this, 'AlwaysAlarming', {
      metric,
      threshold,
      evaluationPeriods,
      comparisonOperator: cw.ComparisonOperator.LESS_THAN_THRESHOLD,
      treatMissingData: cw.TreatMissingData.BREACHING,
    });

    // This alarm shouldn't ever alarm.
    this.neverAlarming = new cw.Alarm(this, 'NeverAlarmingHopefully', {
      metric,
      threshold,
      evaluationPeriods,
      comparisonOperator: cw.ComparisonOperator.GREATER_THAN_THRESHOLD,
      treatMissingData: cw.TreatMissingData.NOT_BREACHING,
    });

    // This composite alarm should always be alarming
    this.compositeAlwaysAlarming = new cw.CompositeAlarm(this, 'CompositeAlwaysAlarming', {
      alarmRule: cw.AlarmRule.anyOf(this.alwaysAlarming, this.neverAlarming),
    });

    // This composite alarm should never be alarming.
    this.compositeNeverAlarming = new cw.CompositeAlarm(this, 'CompositeNeverAlarming', {
      alarmRule: cw.AlarmRule.anyOf(this.neverAlarming),
    });
  }
}