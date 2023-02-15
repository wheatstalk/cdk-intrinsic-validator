/* eslint-disable import/no-extraneous-dependencies */
import { AbortController } from 'node-abort-controller';
// @ts-ignore
import fetch from 'node-fetch';
import { compilePortSpec } from '../../port-spec';

export async function handler(event: HttpCheckRequest): Promise<HttpCheckResult> {
  let checkPatternOptions = {};
  if (event.checkPattern) {
    checkPatternOptions = {
      checkPattern: new RegExp(event.checkPattern, event.checkPatternFlags),
    };
  }

  const result = await httpCheck({
    url: event.url,
    expectedStatus: event.expectedStatus,
    followRedirects: event.followRedirects,
    timeout: event.timeout,
    retryStatus: event.retryStatus,
    ...checkPatternOptions,
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}

export interface HttpCheckBase {
  readonly url: string;
  readonly expectedStatus: string;
  readonly retryStatus?: string;
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
  const timeoutDeadline = Date.now() + options.timeout;

  const isExpectedStatus = compilePortSpec(options.expectedStatus);
  const isRetryStatus = options.retryStatus ? compilePortSpec(options.retryStatus) : () => false;

  try {
    while (true) {
      if (Date.now() > timeoutDeadline) {
        return {
          success: false,
          message: 'HTTP check timed out waiting for expected status',
        };
      }

      const response = await fetch(options.url, {
        redirect: options.followRedirects ? 'follow' : 'manual',
        signal: abortController.signal,
      });

      if (isRetryStatus(response.status)) {
        await new Promise(res => setTimeout(res, 1_000));
        continue;
      }

      if (!isExpectedStatus(response.status)) {
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
    }
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
