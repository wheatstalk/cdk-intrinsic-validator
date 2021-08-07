const AWS = require('aws-sdk');

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

async function isCompleteHandler(event, _context) {
  // We don't have any idea what to do if there's no StateMachineExecutionArn,
  // so we'll just call our work complete.
  if (!event.StateMachineExecutionArn) {
    return { IsComplete: true };
  }

  // Otherwise, we're monitoring a step function.
  const stepFunctions = getStepFunctionsClient();

  console.info(`Describing state machine execution ${event.StateMachineExecutionArn}`);
  const execution = await stepFunctions.describeExecution({
    executionArn: event.StateMachineExecutionArn,
  }).promise();

  console.info('Execution =', execution);

  switch (execution.status) {
    case 'RUNNING':
      return { IsComplete: false };
    case 'SUCCEEDED':
      return { IsComplete: true };
    case 'FAILED':
      throw new Error('One or more of your intrinsic validations have failed, so the stack update will be cancelled. Check the latest Step Function execution for more information.');
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

function getStepFunctionsClient() {
  return new AWS.StepFunctions();
}

exports.onEventHandler = onEventHandler;
exports.isCompleteHandler = isCompleteHandler;