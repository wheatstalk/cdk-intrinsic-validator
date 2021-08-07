import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import { FargateValidationFactory, IntrinsicValidator, Validation } from '..';

class CdkIntrinsicValidator extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', {
      natGatewayProvider: ec2.NatProvider.gateway(),
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: 'tasks',
          subnetType: ec2.SubnetType.PRIVATE,
        },
      ],
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    const curlImage = ecs.ContainerImage.fromRegistry('curlimages/curl:7.78.0');
    const fargateValidations = new FargateValidationFactory(this, 'FargateValidationFactory', {
      cluster,
    });

    // Validate the stack on every deploy and fail the deployment if any of
    // them fail so that CloudFormation can auto-rollback.
    new IntrinsicValidator(this, 'IntrinsicValidator', {
      validations: [
        // Always succeeds. Not necessary. But even it succeeds, if anything
        // else in this validations list fails, the intrinsic validator will
        // error and the stack deployment will roll back.
        Validation.alwaysSucceeds(),
        // Public endpoints because in this vpc environment, I have no
        // services.
        fargateValidations.runContainer(curlImage, 'https://www.example.com/'),
        fargateValidations.runContainer(curlImage, 'https://www.amazon.ca/'),
        fargateValidations.runContainer(curlImage, 'https://www.google.com/'),
        // This one will fail and roll back the stack.
        fargateValidations.runContainer(curlImage, 'https://fake.fake.fake/'),
      ],
    });
  }
}


const app = new cdk.App();
new CdkIntrinsicValidator(app, 'CdkIntrinsicValidator', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
app.synth();
