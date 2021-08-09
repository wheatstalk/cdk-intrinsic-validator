const AWS = require('aws-sdk');

const STATUS_ALARM = 'ALARM';
const STATUS_MONITORING = 'MONITORING';
const STATUS_NO_ALARM = 'NO_ALARM';

async function checkAlarmStatus(input, context) {
  console.info('input =', input);
  console.info('context =', context);

  console.info('Creating CloudWatch client');
  const cloudWatch = new AWS.CloudWatch();

  console.info('Parsing the input');
  const alarmNames = input.AlarmName ? [input.AlarmName] : [];
  const startTime = Date.parse(input.StartTime);
  const monitoringDurationSeconds = input.MonitoringDurationSeconds || 60;

  console.info('alarmNames =', alarmNames);
  console.info('startTime =', startTime);
  console.info('monitoringDurationSeconds =', monitoringDurationSeconds);

  console.info(`Describing alarms in alarming state`);
  const alarms = await cloudWatch.describeAlarms({
    AlarmNames: alarmNames,
    StateValue: 'ALARM',
  }).promise();

  console.info('Alarm info =', alarms);

  if (alarms.MetricAlarms.length > 0) {
    console.warn('Alarm is in an alarming state');
    return {
      Status: STATUS_ALARM,
    }
  }

  const now = Date.now();
  const endTime = startTime + monitoringDurationSeconds*1_000;
  console.info('now =', now);
  console.info('endTime =', endTime);

  if (now < endTime) {
    console.info('The monitoring end time has not yet elapsed.');
    return {
      Status: STATUS_MONITORING,
    }
  } else {
    console.info('Monitoring has finished. There were no alarms.');
    return {
      Status: STATUS_NO_ALARM,
    }
  }
}

exports.checkAlarmStatus = checkAlarmStatus;