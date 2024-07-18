// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports
import CloudWatch = require('aws-sdk/clients/cloudwatch');

export interface CheckAlarmStatusRequest {
  readonly AlarmName: string;
  readonly StartTime: string;
  readonly MonitoringDurationSeconds: number;
}

export interface CheckAlarmStatusResponse {
  readonly Status: AlarmStatus;
}

export enum AlarmStatus {
  Alarm = 'ALARM',
  Monitoring = 'MONITORING',
  NoAlarm = 'NO_ALARM',
}

export class AlarmStatusChecker {
  constructor(private readonly cloudwatch: CloudWatch) { }

  async checkStatus(input: CheckAlarmStatusRequest) {
    console.info('Parsing the input');
    const alarmNames = input.AlarmName ? [input.AlarmName] : [];
    const startTime = Date.parse(input.StartTime);
    const monitoringDurationSeconds = input.MonitoringDurationSeconds || 60;

    console.info('alarmNames =', alarmNames);
    console.info('startTime =', startTime);
    console.info('monitoringDurationSeconds =', monitoringDurationSeconds);

    console.info('Describing alarms in alarming state');
    const alarms = await this.cloudwatch.describeAlarms({
      AlarmNames: alarmNames,
      StateValue: 'ALARM',
      AlarmTypes: ['CompositeAlarm', 'MetricAlarm'],
    }).promise();

    console.info('Alarm info =', alarms);

    const totalAlarms = (alarms.MetricAlarms ?? []).length + (alarms.CompositeAlarms ?? []).length;
    if (totalAlarms > 0) {
      console.warn('Alarm is in an alarming state');
      return {
        Status: AlarmStatus.Alarm,
      };
    }

    const now = Date.now();
    const endTime = startTime + monitoringDurationSeconds * 1_000;
    console.info('now =', now);
    console.info('endTime =', endTime);

    if (now < endTime) {
      console.info('The monitoring end time has not yet elapsed.');
      return {
        Status: AlarmStatus.Monitoring,
      };
    } else {
      console.info('Monitoring has finished. There were no alarms.');
      return {
        Status: AlarmStatus.NoAlarm,
      };
    }
  }
}