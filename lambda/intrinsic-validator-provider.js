const AWS = require('aws-sdk');

// Lambda handlers
exports.onEventHandler = onEventHandler;
exports.isCompleteHandler = isCompleteHandler;

// For testing:
exports.renderErrorMessage = renderErrorMessage;
exports.findFailures = findFailures;
exports.renderFailure = renderFailure;

/**
 * Handles Resource events. We only care about the Create event as we assume
 * that a new custom resource will be created every time the stack is deployed
 * and the old deleted.
 */
async function onEventHandler(event, _context) {
  if (event.RequestType !== 'Create') {
    console.log(`${event.RequestType} event. Doing nothing.`);
    return {
      StateMachineExecutionArn: event.StateMachineExecutionArn,
    };
  }

  const stateMachineArn = getStateMachineArn();
  console.info(`Executing state machine ${stateMachineArn}`);

  const startExecutionResponse = await getStepFunctionsClient().startExecution({
    stateMachineArn: stateMachineArn,
  }).promise();

  console.info('startExecution response:', startExecutionResponse);

  return {
    StateMachineExecutionArn: startExecutionResponse.executionArn,
  };
}

/**
 * Collect all history events from a step function execution.
 * @param {AWS.StepFunctions} stepFunctions
 * @param {string} stateMachineExecutionArn
 * @returns {Promise<StepFunctions.HistoryEvent[]>}
 */
async function getAllHistoryEvents(stepFunctions, stateMachineExecutionArn) {
  /**
   * @type {AWS.StepFunctions.HistoryEvent[]}
   */
  const historyEvents = [];

  let nextToken = undefined;
  do {
    const history = await stepFunctions.getExecutionHistory({
      executionArn: stateMachineExecutionArn,
      nextToken: nextToken,
    }).promise();

    if (history.events) {
      historyEvents.push.apply(historyEvents, history.events);
    }

    nextToken = history.nextToken;
  } while (nextToken);

  return historyEvents;
}

async function isCompleteHandler(event, _context) {
  const stateMachineExecutionArn = event.StateMachineExecutionArn;

  // We don't have any idea what to do if there's no StateMachineExecutionArn,
  // so we'll just call our work complete.
  if (!stateMachineExecutionArn) {
    return { IsComplete: true };
  }

  // Otherwise, we're monitoring a step function.
  const stepFunctions = getStepFunctionsClient();

  console.info(`Describing state machine execution ${stateMachineExecutionArn}`);
  const execution = await stepFunctions.describeExecution({
    executionArn: stateMachineExecutionArn,
  }).promise();

  console.info('Execution =', execution);

  switch (execution.status) {
    case 'RUNNING':
      return { IsComplete: false };
    case 'SUCCEEDED':
      return { IsComplete: true };
    case 'FAILED':
      const historyEvents = await getAllHistoryEvents(stepFunctions, stateMachineExecutionArn);
      throw new Error(renderErrorMessage(historyEvents));
    case 'TIMED_OUT':
    case 'ABORTED':
      throw new Error(`Intrinsic validations have stopped for an unexpected reason. Execution status: ${execution.status}. Execution: ${JSON.stringify(execution)}`);
    default:
      throw new Error(`Unrecognized state machine status ${execution.status}. Execution: ${JSON.stringify(execution)}`);
  }
}

function getStateMachineArn() {
  const stateMachineArn = process.env.STATE_MACHINE_ARN;
  if (!stateMachineArn) {
    throw new Error('Specify the STATE_MACHINE_ARN');
  }

  return stateMachineArn;
}

/**
 * Get the step functions client.
 * @returns {AWS.StepFunctions}
 */
function getStepFunctionsClient() {
  return new AWS.StepFunctions();
}

/**
 * Render an error message from the history events.
 * @param {AWS.StepFunctions.HistoryEvent[]} historyEvents
 * @returns string
 */
function renderErrorMessage(historyEvents) {
  const failedChecks = findFailures(historyEvents)
    .map(renderFailure);
  const message = 'One or more of your intrinsic validations have failed. The stack update will be cancelled.\n\n';
  return message + 'INTRINSIC VALIDATION FAILURES:\n\n' + failedChecks.join('\n\n') + "\n";
}

/**
 * Find failing checks and render them
 * @param {AWS.StepFunctions.HistoryEvent[]} historyEvents
 * @returns {ReconstructedFailure[]}
 */
function findFailures(historyEvents) {
  /**
   * @type {Record<string, AWS.StepFunctions.HistoryEvent>}
   */
  const eventIndex = {};

  /**
   * @type {ReconstructedFailure[]}
   */
  let failures = [];

  historyEvents
    .forEach(historyEvent => {
      eventIndex[historyEvent.id] = historyEvent;

      if (historyEvent.type === 'ExecutionFailed') {
        // When we find a task failed, lets follow its trail in the index to
        // reconstruct complete information about the failing state.
        const failure = reconstructTaskFailure(historyEvent, eventIndex);
        if (/^\[\d+] /.test(failure.name)) {
          failures.push(failure);
        }
      }
    });

  return failures;
}

/**
 * Render a reconstructed failure to a user-friendly message.
 * @param {ReconstructedFailure} failure
 * @returns {string}
 */
function renderFailure(failure) {
  const summarizedCause = summarizeFailureCause(failure);

  // Note: Do not use emojis! CloudFormation will complain that: "Response is
  // not valid JSON"
  return `(FAILURE) ${failure.name} - ${failure.error}: ${summarizedCause}`;
}

/**
 * Summarize the cause of a failure so that the user sees friendlier messages
 * in their CloudWatch events. Once Step Functions supports dynamic failure
 * messages, we should pass all responsibility to format errors back to the
 * state machine.
 * @param {ReconstructedFailure} failure 
 * @returns {string}
 */
function summarizeFailureCause(failure) {
  // XXX: I can't find information on the maximum length of the CloudFormation
  // message, but there is definitely a maximum that can cause CloudFormation
  // to complain that the message is too long and not to show anything else.
  // I've picked this number based on the longest message make it through.
  const CAUSE_SLICE_LENGTH = 176;

  switch (failure.error) {
    case 'States.TaskFailed':
      try {
        const taskDescription = JSON.parse(failure.cause);
        return taskDescription.StoppedReason || 'Unknown cause';
      } catch {
        // The failure should have valid JSON - if it doesn't, we don't
        // know what format it's in, but may still be concerned about
        // the length, so we'll slice it some arbitrary max length.
        return failure.cause.slice(0, CAUSE_SLICE_LENGTH);
      }

    case 'Exception':
      try {
        const exception = JSON.parse(failure.cause);
        const errorMessage = exception.errorMessage;
        const stackTrace = exception.stackTrace || [];

        if (!errorMessage) {
          throw new Error('Exception did not contain an errorMessage');
        }

        const lines = [exception.errorMessage];
        lines.push.apply(lines, stackTrace);

        return lines.join('\n');
      } catch(e) {
        console.error('Could not decode exception:', e);
        return failure.cause;
      }
    
    default:
      return failure.cause;
  }
}

/**
 * @typedef ReconstructedFailure
 * @type object
 * @property {string} name
 * @property {string} error
 * @property {string} cause
 */

/**
 * Reconstruct a task failure so that it includes the task state.
 * @param historyEvent
 * @param eventIndex
 * @returns {ReconstructedFailure}
 */
function reconstructTaskFailure(historyEvent, eventIndex) {
  let name = 'Unknown state';
  let error = 'Unknown error';
  let cause = 'Unknown cause';

  let currentEvent = historyEvent;
  while (currentEvent) {
    switch (currentEvent.type) {
      case 'ExecutionFailed':
        error = currentEvent.executionFailedEventDetails.error || error;
        cause = currentEvent.executionFailedEventDetails.cause || cause;
        break;
      case 'TaskStarted':
      case 'TaskScheduled':
        break;
      case 'TaskStateEntered':
        name = currentEvent.stateEnteredEventDetails.name;
        return {
          name: name,
          error: error,
          cause: cause,
        };
    }

    currentEvent = currentEvent.previousEventId ? eventIndex[currentEvent.previousEventId] : undefined;
  }

  // Didn't find a complete history. Return what we've got, which may be
  // mostly 'Unknown <part>' messages.
  return {
    name: name,
    error: error,
    cause: cause,
  };
}