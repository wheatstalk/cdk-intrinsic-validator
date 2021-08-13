import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import { FargateValidationFactory, IntrinsicValidator, Validation } from '../../src';

/** @internal */
export class IntegMainLit extends cdk.Stack {
  constructor(scope_: cdk.Construct, props: cdk.StackProps = {}) {
    super(scope_, 'IntegMainLit', props);

    // Lit code uses 'scope'
    const scope = this;

    // ::SNIP
    // Create an ECS cluster to run some Fargate tasks in.
    const cluster = new ecs.Cluster(scope, 'Cluster');

    // Instantiate a convenience tool for creating Fargate validations with common
    // options (i.e., a specific ecs cluster.)
    const fargateValidations = new FargateValidationFactory(scope, 'FargateValidationFactory', {
      cluster,
    });

    // Let's do some testing with the curl container image.
    const curlImage = ecs.ContainerImage.fromRegistry('curlimages/curl:7.78.0');

    // Validate the stack on every deploy and fail the deployment if any of
    // the given validations fail so that CloudFormation can auto-rollback.
    new IntrinsicValidator(scope, 'IntrinsicValidator', {
      validations: [
        // Test a public endpoint to see if it responds to HTTP:
        fargateValidations.runContainer({
          // Add an optional label to help identity the validation.
          label: 'cURL the Front Page',
          image: curlImage,
          command: ['https://www.amazon.ca/'],
        }),

        // Most validations are available through the abstract factory.
        Validation.alwaysSucceeds(),

        // The following validations will fail and roll back the stack:
        // fargateValidations.runContainer({
        //   image: curlImage,
        //   command: ['https://fake.fake.fake/'],
        // }),
        // Validation.alwaysFails(),
      ],
    });
    // ::END-SNIP
  }
}

if (!module.parent) {
  const app = new cdk.App();
  new IntegMainLit(app, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
}
