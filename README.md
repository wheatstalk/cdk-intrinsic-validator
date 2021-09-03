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
- Run Puppeteer tests against your website and roll back if they fail.
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
      duration: cdk.Duration.minutes(5),
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

## Execute Puppeteer tests on every deployment

To run Puppeteer-based tests on every deployment, you can run Puppeteer in
a Fargate task. Puppeteer runs Chromium, so it needs many resources and has
some specific requirements.

The example below (and in [examples/puppeteer][1]) shows how you can use
Jest to orchestrate your Puppeteer tests on every stack deployment:

<!-- <macro exec="lit-snip ./test/integ/integ.fargate-puppeteer.lit.ts"> -->
```ts
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
  // The full test log is too long to show in the CloudFormation output,
  // so if we are interested in seeing why the tests failed, we need to
  // log the container output somewhere.
  logging: ecs.LogDriver.awsLogs({ streamPrefix: '/' }),
});

// Create an intrinsic validator as usual
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    // Check that the Fargate task succeeds on every deploy or roll back.
    Validation.fargateTaskSucceeds({
      cluster,
      taskDefinition,
    }),
  ],
});
```
<!-- </macro> -->

## Use Lambda to Check a URL

<!-- <macro exec="lit-snip ./test/integ/integ.http-check.lit.ts"> -->
```ts
new IntrinsicValidator(scope, 'IntrinsicValidator', {
  validations: [
    // Check a URL with a lambda outside of your VPCs
    Validation.httpCheck({
      url: 'https://httpstat.us/200',
      // (optional) Check the page content for a node-compatible regex.
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
