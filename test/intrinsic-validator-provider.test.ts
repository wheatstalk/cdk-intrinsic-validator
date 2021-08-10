import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const provider = require('../lambda/intrinsic-validator-provider');

test('finding failure messages', () => {
  // GIVEN
  const events = getEvents();

  // WHEN
  const failures = provider.findFailures(events);

  // THEN
  expect(failures).toHaveLength(1);
  expect(failures[0].name).toEqual('[1] LambdaInvokeSucceeds');
  expect(failures[0].error).toEqual('Exception');
  expect(failures[0].cause).toContain('An expected failure');
});

test('rendering an failure', () => {
  const failure = {
    name: '[1] LambdaInvokeSucceeds',
    error: 'Exception',
    cause: 'Test error',
  };

  // WHEN
  const rendered = provider.renderFailure(failure);

  // THEN
  expect(rendered).toEqual('(FAILURE) [1] LambdaInvokeSucceeds - Exception: Test error');
});

test('rendering error messages from a complete history', () => {
  // GIVEN
  const events = getEvents();

  // WHEN
  const errorMessage = provider.renderErrorMessage(events);

  // THEN
  expect(errorMessage).toEqual(
    expect.stringMatching(/\[1] LambdaInvokeSucceeds - Exception: .*An expected failure/),
  );
});

function getEvents() {
  const json = fs.readFileSync(path.join(__dirname, 'intrinsic-validator-provider.history.json')).toString('utf-8');
  const parsed = JSON.parse(json);
  return parsed.events;
}