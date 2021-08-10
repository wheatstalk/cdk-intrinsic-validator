import { Chain, Pass, StateMachine, TaskInput } from '@aws-cdk/aws-stepfunctions';
import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '..';

/** @internal */
export class ItLitStepFunction extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'ItLitStepFunction', props);

    const stateMachine = new StateMachine(this, 'StateMachine', {
      definition: Chain.start(new Pass(this, 'Pass')),
    });

    // Lit code uses 'scope'
    const scope = this;

    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Execute the given step function and if it fails, cancel and roll back
        // the deployment.
        Validation.stateMachineExecutionSucceeds({
          stateMachine,
          // Input is optional
          input: TaskInput.fromObject({
            anything: 'you need',
          }),
        }),
      ],
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItLitStepFunction(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
