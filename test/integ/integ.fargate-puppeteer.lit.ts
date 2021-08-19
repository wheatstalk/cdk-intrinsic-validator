import * as path from 'path';
import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegFargatePuppeteer extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegFargatePuppeteer', props);

    const cluster = new ecs.Cluster(this, 'Cluster');

    const scope = this;
    const baseDir = path.join(__dirname, '..', '..');

    // ::SNIP
    // Create a task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      // Puppeteer runs better with more resources. It won't be running long.
      cpu: 4096,
      memoryLimitMiB: 8192,
    });

    // Add our container to the task definition
    taskDefinition.addContainer('main', {
      // Let's test with a jest & puppeteer rig from the examples directory.
      image: ecs.ContainerImage.fromAsset(path.join(baseDir, 'examples', 'puppeteer')),
      environment: {
        // This environment variable configures the test rig not to launch
        // Puppeteer/Chromium in a sandbox. If we aren't specific about this,
        // Puppeteer needs CAP_SYS_ADMIN, which Fargate does not support.
        NO_SANDBOX: 'true',
      },
      // We supply a command that runs jest to orchestrate Puppeteer.
      command: ['yarn', 'test', '--verbose'],
      // The full of the test is too long to show in the CloudFormation output,
      // so if we are interested in seeing why the tests failed, we need to
      // log the container output somewhere.
      logging: ecs.LogDriver.awsLogs({ streamPrefix: '/' }),
    });

    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        Validation.fargateTaskSucceeds({
          cluster,
          taskDefinition,
        }),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegFargatePuppeteer(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
