import * as fs from 'fs';
import * as path from 'path';
import * as provider from '../../../src/lambda/intrinsic-validator-provider/lambda';

describe('summarizing failure cause', () => {
  const cases = [
    [
      'monitorAlarm.json',
      '(FAILURE) [0] MonitorAlarm - Alarm: IntegErrorMessage-TestAlarmsAlwaysAlarming69FED027-XZB960YUVQLD is alarming',
    ],
    [
      'lambdaInvokeSucceeds.json',
      '(FAILURE) [0] Check That Error Messages Show - Exception: An expected failure\n' +
      '  File "/var/task/index.py", line 3, in handler\n' +
      '    raise Exception(\'An expected failure\')\n',
    ],
    [
      'fargateTaskSucceeds.json',
      '(FAILURE) [0] FargateTaskSucceeds - States.TaskFailed: Essential container in task exited',
    ],
    [
      'stateMachineExecutionSucceeds.json',
      '(FAILURE) [0] StateMachineExecutionSucceeds - ExecutionFailed: arn:aws:states:ca-central-1:CENSORED:stateMachine:SingletonAlarmMonitorStateMachine9830D808-yqO3EW4REqFh failed to execute',
    ],
  ];

  test.each(cases)('%s', (file, expectedError) => {
    // GIVEN
    const events = readExecutionHistory(file);
    const [failure] = provider.findFailures(events);
    // WHEN
    const message = provider.renderFailure(failure);
    // THEN
    expect(message).toEqual(expectedError);
  });
});

function readExecutionHistory(historyFile: string) {
  const json = fs.readFileSync(path.join(__dirname, 'execution-histories', historyFile)).toString('utf-8');
  const parsed = JSON.parse(json);
  return parsed.events;
}
