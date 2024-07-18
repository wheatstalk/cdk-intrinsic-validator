// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports
import CloudWatch = require('aws-sdk/clients/cloudwatch');
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