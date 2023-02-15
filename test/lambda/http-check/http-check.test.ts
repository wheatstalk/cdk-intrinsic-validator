import { httpCheck } from '../../../src/lambda/http-check/lambda';

// Longer timeouts because we're using live HTTP checking...
jest.setTimeout(30_000);

describe('http checks', () => {
  test('http 200', async () => {
    const options = {
      url: 'https://httpstat.us/200',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 3000,
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Check succeeded',
      }));
  });

  test('unexpected status', async () => {
    // GIVEN
    const options = {
      url: 'https://httpstat.us/404',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 3000,
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: 'Unexpected HTTP status: 404',
      }));
  });

  test('retry status', async () => {
    // GIVEN
    const options = {
      url: 'https://httpstat.us/502',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 5000,
      retryStatus: '500-599',
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: 'HTTP check timed out waiting for expected status',
      }));
  });

  test('timeout', async () => {
    // GIVEN
    const options = {
      url: 'https://httpstat.us/200?sleep=5000',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 500,
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: 'The request timed out after 500ms',
      }));
  });

  test('network error', async () => {
    // GIVEN
    const options = {
      url: 'https://127.0.0.1:1/impossible',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 10000,
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: expect.stringMatching(/^Could not fetch the url:/),
      }));
  });

  test('matching content check', async () => {
    // GIVEN
    const options = {
      url: 'https://httpstat.us/200',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 3000,
      checkPattern: /\d+\s+OK/i,
    };

    // WHEN
    const result = await httpCheck(options);

    // THEN
    expect(result).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Check succeeded',
      }));
  });

  test('unmatching content check', async () => {
    const options = {
      url: 'https://httpstat.us/200',
      expectedStatus: '200',
      followRedirects: false,
      timeout: 3000,
      checkPattern: /NEVER_MATCH/i,
    };

    const result = await httpCheck(options);

    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        message: 'The content does not match the given check pattern',
      }));
  });
});