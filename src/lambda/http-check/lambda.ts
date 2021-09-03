/* eslint-disable import/no-extraneous-dependencies */
import { AbortController } from 'node-abort-controller';
// @ts-ignore
import fetch from 'node-fetch';

export async function handler(_event: HttpCheckRequest): Promise<HttpCheckResult> {
  let checkPatternOptions = {};
  if (_event.checkPattern) {
    checkPatternOptions = {
      checkPattern: new RegExp(_event.checkPattern, _event.checkPatternFlags),
    };
  }

  const result = await httpCheck({
    url: _event.url,
    expectedStatus: _event.expectedStatus,
    followRedirects: _event.followRedirects,
    timeout: _event.timeout,
    ...checkPatternOptions,
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}

export interface HttpCheckBase {
  readonly url: string;
  readonly expectedStatus: number;
  readonly followRedirects: boolean;
  readonly timeout: number;
}

export interface HttpCheckRequest extends HttpCheckBase {
  readonly checkPattern?: string;
  readonly checkPatternFlags?: string;
}

export interface HttpCheckResult {
  readonly success: boolean;
  readonly message: string;
}

export interface HttpCheckOptions extends HttpCheckBase {
  readonly checkPattern?: RegExp;
}

export async function httpCheck(options: HttpCheckOptions): Promise<HttpCheckResult> {
  const abortController = new AbortController();
  const timeoutHandle = setTimeout(() => abortController.abort(), options.timeout);

  try {
    const response = await fetch(options.url, {
      redirect: options.followRedirects ? 'follow' : 'manual',
      signal: abortController.signal,
    });

    if (response.status !== options.expectedStatus) {
      return {
        success: false,
        message: `Unexpected HTTP status: ${response.status}`,
      };
    }

    if (options.checkPattern) {
      const body = await response.text();
      if (!options.checkPattern.test(body)) {
        return {
          success: false,
          message: 'The content does not match the given check pattern',
        };
      }
    }

    return {
      success: true,
      message: 'Check succeeded',
    };
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      return {
        success: false,
        message: `The request timed out after ${options.timeout}ms`,
      };
    } else {
      return {
        success: false,
        message: `Could not fetch the url: ${e}`,
      };
    }
  } finally {
    clearTimeout(timeoutHandle);
  }
}
