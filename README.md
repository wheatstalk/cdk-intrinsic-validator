# CDK Intrinsic Validator

This CDK construct allows you to add intrinsic validation to your CDK stacks.
Adding intrinsic validation adds checks that occur during deployment that, if
they fail, will automatically roll back the stack.

**Example error**

You can view errors directly in your CloudWatch event log. To see these
errors, ensure that you run the CDK CLI with `--progress events`.

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

<!-- <macro exec="lit-snip ./test/integ/integ.main.lit.ts"> -->
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
```
<!-- </macro> -->

## Validate with any Fargate task

<!-- <macro exec="lit-snip ./test/integ/integ.fargate.lit.ts"> -->
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

<!-- <macro exec="lit-snip ./test/integ/integ.cloudwatch-alarm.lit.ts"> -->
```ts
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    // Monitor the given alarm for five minutes before allowing the deployment
    // to complete. If the alarm starts sounding while intrinsic validation is
    // monitoring it, the stack will roll back automatically.
    Validation.monitorAlarm({
      alarm,
      duration: cdk.Duration.minutes(1),
    }),
  ],
});
```
<!-- </macro> -->

## Invoke an ad-hoc Lambda

<!-- <macro exec="lit-snip ./test/integ/integ.lambda.lit.ts"> -->
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

<!-- <macro exec="lit-snip ./test/integ/integ.step-function.lit.ts"> -->
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

## Check a URL

With the `httpCheck` validation, you can check a URL on every stack
deployment without the overhead of having a VPC or waiting for containers
to spin up.

<!-- <macro exec="lit-snip ./test/integ/integ.http-check.lit.ts"> -->
```ts
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    Validation.httpCheck({
      // Replace this URL with a public endpoint of your own
      url: 'https://httpstat.us/200',
      // (optional) Expect an http 200 status
      expectedStatus: '200',
      // (optional) Ignore http 4xx or 502 statuses and retry the check up to the timeout
      retryStatus: '400-499,502',
      // (optional) Try for up to 14 minutes
      timeout: Duration.minutes(14),
      // (optional) Check the page content for a node-compatible regex
      checkPattern: '\\d+\\s+OK',
      // (optional) Provide regex flags
      checkPatternFlags: 'i',
    }),
  ],
});
```
<!-- </macro> -->

## Tips

- If you're adding `IntrinsicValidator` to your stack for the first time, try
  adding it without validations. This way, if the intrinsic validator catches
  a validation error, you can keep the State Machine that contains the error.

[1]: examples/puppeteer

- If you are using snapshot tests on your stack then you may run into issues because
  the stack will constantly fail as the Logical ID of the intrinsic validator will 
  always be different. You can you disable this in your tests using a context value:
  
  ```ts
  import { DisableRandomnessContextKey } from '@wheatstalk/cdk-intrinsic-validator';

  test('Snapshot test', ()=> {
    const app = new App({
      context: {
        [DisableRandomnessContextKey]: true,
      },
    });
  });
  
  ```
