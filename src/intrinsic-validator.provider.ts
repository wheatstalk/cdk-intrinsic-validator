// eslint-disable-next-line import/no-extraneous-dependencies
import * as AWS from 'aws-sdk';

enum RequestType {
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
}

type ResourceProperties = Record<string, string>;

interface ResourceFrameworkEvent {
  readonly RequestType: RequestType;
  readonly LogicalResourceId: string;
  readonly ResourceProperties?: ResourceProperties;
  readonly OldResourceProperties?: ResourceProperties;
  readonly ResourceType: string;
  readonly RequestId: string;
  readonly StackId: string;

  readonly PhysicalResourceId?: string;
  readonly StateMachineExecutionArn?: string;
}

type OnEventResult = {
  readonly Data?: Record<string, string>;
} & Record<string, any>;

export const onEventHandler = async (event: ResourceFrameworkEvent, context: any): Promise<OnEventResult> => {
  console.info('Event =', event);
  console.info('Context =', context);
  console.info('process.env =', process.env);

  const stateMachineArn = getStateMachineArn();

  switch (event.RequestType) {
    case RequestType.CREATE:
      const stepFunctions = getStepFunctionsClient();

      console.info(`Executing state machine ${stateMachineArn}`);
      const startExecutionResponse = await stepFunctions.startExecution({
        stateMachineArn: stateMachineArn,
      }).promise();

      console.info('startExecution response:', startExecutionResponse);

      return {
        StateMachineExecutionArn: startExecutionResponse.executionArn,
      };

    case RequestType.UPDATE:
      console.log('Update event.. Doing nothing');
      return {
        StateMachineExecutionArn: event.StateMachineExecutionArn,
      };

    case RequestType.DELETE:
      console.log('Delete event.. Doing nothing');
      return {
        StateMachineExecutionArn: event.StateMachineExecutionArn,
      };
  }
};

interface IsCompleteEvent {
  readonly StateMachineExecutionArn: string;
}

interface IsCompleteResult {
  readonly IsComplete: boolean;
}

export const isCompleteHandler = async (event: IsCompleteEvent, context: any): Promise<IsCompleteResult> => {
  console.info('Event =', event);
  console.info('Context =', context);
  console.info('process.env =', process.env);

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
      throw new Error(`Intrinsic validations have stopped for an unexpected reason. Execution status: ${execution.status}. Extra data: ${JSON.stringify(execution)}`);
    default:
      throw new Error(`Unrecognized state machine status ${execution.status}. Extra data: ${JSON.stringify(execution)}`);
  }
};

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