# CDK Intrinsic Validator

This CDK construct allows you to add intrinsic validation to your CDK stacks.
Adding intrinsic validation adds checks that occur during deployment that, if
they fail, will automatically roll back the stack.

**Example error**

![An example of an intrinsic validation error](images/failure-example.png)

## Intrinsic Validation Types

You can add the following intrinsic validations:

- Run Fargate tasks to test your system - if any fail, the stack rolls back.
- Monitor CloudWatch Alarms for a while and roll back if they alarm.
- Execute a Step Functions State Machine and roll back if it fails.
- Invoke a Lambda Function to validate and roll back if it fails.
- More to come. If you have any ideas and want to contribute, please open a
  feature request!

## Usage

<!-- <macro exec="node ./scripts/lit-snip.js ./src/it/it-lit.ts"> -->
```ts
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
    // Test some public endpoints to see if they respond to HTTP:
    fargateValidations.runContainer({
      image: curlImage,
      command: ['https://www.example.com/'],
    }),
    fargateValidations.runContainer({
      // Add an optional label to help identity the validation.
      label: 'cURL the Front Page',
      image: curlImage,
      command: ['https://www.amazon.ca/'],
    }),

    // Most validations are available through the abstract factory.
    Validation.alwaysSucceeds(),

    // The following validations will fail and roll back the stack:
    // fargateValidations.runContainer(curlImage, 'https://fake.fake.fake/'),
    // Validation.alwaysFails(),
  ],
});
```
<!-- </macro> -->

## Validate With Any Fargate Task

<!-- <macro exec="node ./scripts/lit-snip.js ./src/it/it-lit-fargate.ts"> -->
```ts
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
```
<!-- </macro> -->

## Monitor a CloudWatch Alarm

<!-- <macro exec="node ./scripts/lit-snip.js ./src/it/it-lit-cloudwatch-alarm.ts"> -->
```ts
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    // Monitor the given alarm for five minutes before allowing the deployment
    // to complete. If the alarm starts sounding while intrinsic validation is
    // monitoring it, the stack will roll back automatically.
    Validation.monitorAlarm({
      alarm,
      duration: cdk.Duration.minutes(5),
    }),
  ],
});
```
<!-- </macro> -->

## Invoke an Ad-hoc Lambda

<!-- <macro exec="node ./scripts/lit-snip.js ./src/it/it-lit-lambda.ts"> -->
```ts
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    // Invoke the given Lambda function. If the function fails, the deployment
    // will be cancelled and rolled back.
    Validation.lambdaInvokeSucceeds({
      lambdaFunction,
    }),
  ],
});
```
<!-- </macro> -->

## Execute a Step Functions State Machine

<!-- <macro exec="node ./scripts/lit-snip.js ./src/it/it-lit-step-function.ts"> -->
```ts
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
```
<!-- </macro> -->

## Tips

- If you're adding `IntrinsicValidator` to your stack for the first time, try
  adding it without validations. This way, if the intrinsic validator catches
  a validation error, you can keep the State Machine that contains the error.
