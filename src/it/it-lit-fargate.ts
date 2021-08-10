import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '..';

/** @internal */
export class ItLitFargate extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'ItLitFargate', props);

    const cluster = new ecs.Cluster(this, 'Cluster');
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      cpu: 256,
      memoryLimitMiB: 512,
    });
    taskDefinition.addContainer('main', {
      image: ecs.ContainerImage.fromRegistry('alpine'),
      command: ['true'],
    });

    // Lit code uses 'scope'
    const scope = this;

    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Use this generic interface to launch a Fargate task on the given cluster
        // from the given task definition. If the task run fails, the stack
        // deployment will cancel and roll back.
        Validation.fargateTaskSucceeds({
          cluster,
          taskDefinition,
          // ... other options:
          // assignPublicIp: ...,
          // containerOverrides: ...,
          // securityGroups: ...,
          // subnets: ...,
        }),
      ],
    });
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new ItLitFargate(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
