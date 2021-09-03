// eslint-disable-next-line import/no-extraneous-dependencies
import { CloudWatch } from 'aws-sdk';
import { AlarmStatusChecker, CheckAlarmStatusRequest, CheckAlarmStatusResponse } from './alarm-status-checker';

export async function handler(input: CheckAlarmStatusRequest): Promise<CheckAlarmStatusResponse> {
  console.info('input =', input);
  console.info('Creating CloudWatch client');
  const cloudWatch = new CloudWatch();

  console.info('Creating the Alarm Status Checker');
  const checker = new AlarmStatusChecker(cloudWatch);

  console.info('Checking the alarm status');
  return checker.checkStatus(input);
}