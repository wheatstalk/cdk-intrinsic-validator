import * as cdk from 'aws-cdk-lib';
import * as cw from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

/**
 * Create some test alarms.
 * @internal
 */
export class TestAlarms extends Construct {
  /** An alarm that is always in alarm */
  public readonly alwaysAlarming: cw.IAlarm;
  /** An alarm that is never in alarm */
  public readonly neverAlarming: cw.IAlarm;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create some alarms
    const metric = new cw.Metric({
      metricName: 'EstimatedCharges',
      namespace: 'AWS/Billing',
      statistic: 'Maximum',
      dimensionsMap: {
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

    new cdk.CfnOutput(this, 'AlwaysAlarmingExecution', {
      value: JSON.stringify({
        AlarmName: this.alwaysAlarming.alarmName,
        MonitoringSeconds: 31,
      }),
    });

    // This alarm shouldn't ever alarm.
    this.neverAlarming = new cw.Alarm(this, 'NeverAlarmingHopefully', {
      metric,
      threshold,
      evaluationPeriods,
      comparisonOperator: cw.ComparisonOperator.GREATER_THAN_THRESHOLD,
      treatMissingData: cw.TreatMissingData.NOT_BREACHING,
    });

    new cdk.CfnOutput(this, 'NeverAlarmingExecution', {
      value: JSON.stringify({
        AlarmName: this.neverAlarming.alarmName,
        MonitoringSeconds: 60,
      }),
    });
  }
}