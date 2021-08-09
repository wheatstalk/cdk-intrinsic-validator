import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';
import {
  FargateValidationFactory,
  IntrinsicValidator,
  // @ts-ignore
  Validation,
} from '..';
import { TestAlarms } from './test-alarms';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'CdkIntrinsicValidator', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Create an ECS cluster to run some Fargate tasks in.
const cluster = new ecs.Cluster(stack, 'Cluster');

// A convenience tool for creating Fargate validations with common options
// (i.e., a specific ecs cluster.)
const fargateValidations = new FargateValidationFactory(stack, 'FargateValidationFactory', {
  cluster,
});

// Let's do some testing with the curl container image.
const curlImage = ecs.ContainerImage.fromRegistry('curlimages/curl:7.78.0');

const testAlarms = new TestAlarms(stack, 'TestAlarms');

// Validate the stack on every deploy and fail the deployment if any of
// the given validations fail so that CloudFormation can auto-rollback.
new IntrinsicValidator(stack, 'IntrinsicValidator', {
  validations: [
    // Test some public endpoints to see if they respond to HTTP:
    fargateValidations.runContainer(curlImage, 'https://www.example.com/'),
    fargateValidations.runContainer(curlImage, 'https://www.amazon.ca/'),
    fargateValidations.runContainer(curlImage, 'https://www.google.com/'),

    // Monitor an alarm
    Validation.monitorAlarm({
      alarm: testAlarms.neverAlarming,
      duration: cdk.Duration.seconds(30),
    }),

    // The following validations will fail and roll back the stack:
    // fargateValidations.runContainer(curlImage, 'https://fake.fake.fake/'),
    // Validation.alwaysFails(),
  ],
});
