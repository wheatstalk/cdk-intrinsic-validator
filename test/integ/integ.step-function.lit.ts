import * as cdk from 'aws-cdk-lib';
import { Chain, Pass, StateMachine, TaskInput } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegStepFunctionLit extends cdk.Stack {
  constructor(scope_: Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegStepFunctionLit', props);

    const stateMachine = new StateMachine(this, 'StateMachine', {
      definition: Chain.start(new Pass(this, 'Pass')),
    });

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
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
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegStepFunctionLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
