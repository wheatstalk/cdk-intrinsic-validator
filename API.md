# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FargateValidationFactory <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory"></a>

A convenience tool for creating Fargate-based validations.

#### Initializers <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer"></a>

```typescript
import { FargateValidationFactory } from '@wheatstalk/cdk-intrinsic-validator'

new FargateValidationFactory(scope: Construct, id: string, props: FargateValidationFactoryProps)
```

##### `scope`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.props"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps`](#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps)

---

#### Methods <a name="Methods"></a>

##### `runContainer` <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.runContainer"></a>

```typescript
public runContainer(options: FargateValidationRunContainerOptions)
```

###### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions`](#@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions)

---




### IntrinsicValidator <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator"></a>

Adds intrinsic validation to a CloudFormation stack.

#### Initializers <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer"></a>

```typescript
import { IntrinsicValidator } from '@wheatstalk/cdk-intrinsic-validator'

new IntrinsicValidator(scope: Construct, id: string, props?: IntrinsicValidatorProps)
```

##### `scope`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.parameter.props"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps`](#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps)

---





## Structs <a name="Structs"></a>

### FargateTaskSucceedsOptions <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions"></a>

Options for Fargate task validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FargateTaskSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateTaskSucceedsOptions: FargateTaskSucceedsOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* [`aws-cdk-lib.aws_ecs.ICluster`](#aws-cdk-lib.aws_ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* [`aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride`](#aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* [`aws-cdk-lib.aws_ec2.ISecurityGroup`](#aws-cdk-lib.aws_ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* [`aws-cdk-lib.aws_ec2.SubnetSelection`](#aws-cdk-lib.aws_ec2.SubnetSelection)

Select subnets in which tasks will run.

---

##### `taskDefinition`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: TaskDefinition;
```

- *Type:* [`aws-cdk-lib.aws_ecs.TaskDefinition`](#aws-cdk-lib.aws_ecs.TaskDefinition)

---

### FargateValidationBaseOptions <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions"></a>

Base options for Fargate-based validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FargateValidationBaseOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationBaseOptions: FargateValidationBaseOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* [`aws-cdk-lib.aws_ecs.ICluster`](#aws-cdk-lib.aws_ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* [`aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride`](#aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* [`aws-cdk-lib.aws_ec2.ISecurityGroup`](#aws-cdk-lib.aws_ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* [`aws-cdk-lib.aws_ec2.SubnetSelection`](#aws-cdk-lib.aws_ec2.SubnetSelection)

Select subnets in which tasks will run.

---

### FargateValidationFactoryProps <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps"></a>

Props for `FargateValidationFactory`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FargateValidationFactoryProps } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationFactoryProps: FargateValidationFactoryProps = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* [`aws-cdk-lib.aws_ecs.ICluster`](#aws-cdk-lib.aws_ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* [`aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride`](#aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* [`aws-cdk-lib.aws_ec2.ISecurityGroup`](#aws-cdk-lib.aws_ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* [`aws-cdk-lib.aws_ec2.SubnetSelection`](#aws-cdk-lib.aws_ec2.SubnetSelection)

Select subnets in which tasks will run.

---

### FargateValidationRunContainerOptions <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions"></a>

Base options for running containers.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FargateValidationRunContainerOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationRunContainerOptions: FargateValidationRunContainerOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `image`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.image"></a>

```typescript
public readonly image: ContainerImage;
```

- *Type:* [`aws-cdk-lib.aws_ecs.ContainerImage`](#aws-cdk-lib.aws_ecs.ContainerImage)

Container image to run.

---

##### `command`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* `string`[]
- *Default:* use the image's default.

Run this container command.

---

### HttpCheckSucceedsOptions <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { HttpCheckSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const httpCheckSucceedsOptions: HttpCheckSucceedsOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `url`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* `string`

URL to check.

---

##### `checkPattern`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPattern"></a>

```typescript
public readonly checkPattern: string;
```

- *Type:* `string`
- *Default:* Only HTTP status is checked

Check the response body of the URL for this Node-compatible regex pattern.

---

##### `checkPatternFlags`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPatternFlags"></a>

```typescript
public readonly checkPatternFlags: string;
```

- *Type:* `string`
- *Default:* No flags

Regex pattern flags.

---

##### `expectedStatus`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.expectedStatus"></a>

```typescript
public readonly expectedStatus: string | number;
```

- *Type:* `string` | `number`
- *Default:* 200

Expect an HTTP status.

---

##### `followRedirects`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.followRedirects"></a>

```typescript
public readonly followRedirects: boolean;
```

- *Type:* `boolean`
- *Default:* false

Follow redirects when performing the check.

---

##### `retryStatus`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryStatus"></a>

```typescript
public readonly retryStatus: string;
```

- *Type:* `string`
- *Default:* no retries

Retry the check if the given http status is resolved.

---

##### `retryUntilTimeout`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryUntilTimeout"></a>

```typescript
public readonly retryUntilTimeout: boolean;
```

- *Type:* `boolean`
- *Default:* false

Continue to retry the check until the timeout is reached.

---

##### `timeout`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* [`aws-cdk-lib.Duration`](#aws-cdk-lib.Duration)
- *Default:* Duration.seconds(3)

Maximum time to wait for a response.

---

### IntrinsicValidatorProps <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps"></a>

Props for `IntrinsicValidator`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { IntrinsicValidatorProps } from '@wheatstalk/cdk-intrinsic-validator'

const intrinsicValidatorProps: IntrinsicValidatorProps = { ... }
```

##### `stateMachineName`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.stateMachineName"></a>

```typescript
public readonly stateMachineName: string;
```

- *Type:* `string`
- *Default:* CDK automatically picks a name

Name the Step Functions State Machine.

---

##### `validations`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.validations"></a>

```typescript
public readonly validations: Validation[];
```

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.Validation`](#@wheatstalk/cdk-intrinsic-validator.Validation)[]
- *Default:* no validations are run

Validations to run every time the stack is deployed.

---

### LambdaInvokeSucceedsOptions <a name="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions"></a>

Options for lambda validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { LambdaInvokeSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const lambdaInvokeSucceedsOptions: LambdaInvokeSucceedsOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `lambdaFunction`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: IFunction;
```

- *Type:* [`aws-cdk-lib.aws_lambda.IFunction`](#aws-cdk-lib.aws_lambda.IFunction)

The Lambda function to invoke.

If there's an error, throw from within your function.

---

### MonitorAlarmOptions <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions"></a>

Options for monitoring alarms.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MonitorAlarmOptions } from '@wheatstalk/cdk-intrinsic-validator'

const monitorAlarmOptions: MonitorAlarmOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `alarm`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.alarm"></a>

```typescript
public readonly alarm: IAlarm;
```

- *Type:* [`aws-cdk-lib.aws_cloudwatch.IAlarm`](#aws-cdk-lib.aws_cloudwatch.IAlarm)

The alarm to monitor.

---

##### `duration`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.duration"></a>

```typescript
public readonly duration: Duration;
```

- *Type:* [`aws-cdk-lib.Duration`](#aws-cdk-lib.Duration)
- *Default:* one minute

The length of time to monitor the alarm.

---

### StateMachineExecutionSucceedsOptions <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions"></a>

Options for step function validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { StateMachineExecutionSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const stateMachineExecutionSucceedsOptions: StateMachineExecutionSucceedsOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `stateMachine`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- *Type:* [`aws-cdk-lib.aws_stepfunctions.IStateMachine`](#aws-cdk-lib.aws_stepfunctions.IStateMachine)

The state machine to execute.

---

##### `input`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.input"></a>

```typescript
public readonly input: TaskInput;
```

- *Type:* [`aws-cdk-lib.aws_stepfunctions.TaskInput`](#aws-cdk-lib.aws_stepfunctions.TaskInput)
- *Default:* no input given

Input for the state machine's execution.

---

### ValidationBaseOptions <a name="@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions"></a>

Base options for validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ValidationBaseOptions } from '@wheatstalk/cdk-intrinsic-validator'

const validationBaseOptions: ValidationBaseOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

## Classes <a name="Classes"></a>

### Validation <a name="@wheatstalk/cdk-intrinsic-validator.Validation"></a>

Create many types of validations.

#### Initializers <a name="@wheatstalk/cdk-intrinsic-validator.Validation.Initializer"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

new Validation(options: ValidationBaseOptions)
```

##### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions`](#@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions)

---


#### Static Functions <a name="Static Functions"></a>

##### `alwaysFails` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.alwaysFails"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.alwaysFails()
```

##### `alwaysSucceeds` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.alwaysSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.alwaysSucceeds()
```

##### `fargateTaskSucceeds` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.fargateTaskSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.fargateTaskSucceeds(options: FargateTaskSucceedsOptions)
```

###### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions`](#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions)

---

##### `httpCheck` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.httpCheck"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.httpCheck(param: HttpCheckSucceedsOptions)
```

###### `param`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.param"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions`](#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions)

---

##### `lambdaInvokeSucceeds` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.lambdaInvokeSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.lambdaInvokeSucceeds(options: LambdaInvokeSucceedsOptions)
```

###### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions`](#@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions)

---

##### `monitorAlarm` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.monitorAlarm"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.monitorAlarm(options: MonitorAlarmOptions)
```

###### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions`](#@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions)

---

##### `stateMachineExecutionSucceeds` <a name="@wheatstalk/cdk-intrinsic-validator.Validation.stateMachineExecutionSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.stateMachineExecutionSucceeds(options: StateMachineExecutionSucceedsOptions)
```

###### `options`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.Validation.parameter.options"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions`](#@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions)

---




