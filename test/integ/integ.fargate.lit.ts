import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegFargateLit extends cdk.Stack {
  constructor(scope_: Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegFargateLit', props);

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

    // ::SNIP
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
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegFargateLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
