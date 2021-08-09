# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FargateValidationFactory <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory"></a>

A convenience tool for creating Fargate-based validations.

#### Initializer <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer"></a>

```typescript
import { FargateValidationFactory } from '@wheatstalk/cdk-intrinsic-validator'

new FargateValidationFactory(scope: Construct, id: string, props: FargateValidationFactoryProps)
```

##### `scope`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

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

#### Initializer <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer"></a>

```typescript
import { IntrinsicValidator } from '@wheatstalk/cdk-intrinsic-validator'

new IntrinsicValidator(scope: Construct, id: string, props?: IntrinsicValidatorProps)
```

##### `scope`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-ecs.ICluster`](#@aws-cdk/aws-ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.assignPublicIp"></a>

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.containerOverrides"></a>

- *Type:* [`@aws-cdk/aws-stepfunctions-tasks.ContainerOverride`](#@aws-cdk/aws-stepfunctions-tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.securityGroups"></a>

- *Type:* [`@aws-cdk/aws-ec2.ISecurityGroup`](#@aws-cdk/aws-ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.subnets"></a>

- *Type:* [`@aws-cdk/aws-ec2.SubnetSelection`](#@aws-cdk/aws-ec2.SubnetSelection)

Select subnets in which tasks will run.

---

##### `taskDefinition`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.taskDefinition"></a>

- *Type:* [`@aws-cdk/aws-ecs.TaskDefinition`](#@aws-cdk/aws-ecs.TaskDefinition)

---

### FargateValidationBaseOptions <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions"></a>

Base options for Fargate-based validations.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FargateValidationBaseOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationBaseOptions: FargateValidationBaseOptions = { ... }
```

##### `label`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.label"></a>

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-ecs.ICluster`](#@aws-cdk/aws-ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.assignPublicIp"></a>

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.containerOverrides"></a>

- *Type:* [`@aws-cdk/aws-stepfunctions-tasks.ContainerOverride`](#@aws-cdk/aws-stepfunctions-tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.securityGroups"></a>

- *Type:* [`@aws-cdk/aws-ec2.ISecurityGroup`](#@aws-cdk/aws-ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.subnets"></a>

- *Type:* [`@aws-cdk/aws-ec2.SubnetSelection`](#@aws-cdk/aws-ec2.SubnetSelection)

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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-ecs.ICluster`](#@aws-cdk/aws-ecs.ICluster)

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.assignPublicIp"></a>

- *Type:* `boolean`

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.containerOverrides"></a>

- *Type:* [`@aws-cdk/aws-stepfunctions-tasks.ContainerOverride`](#@aws-cdk/aws-stepfunctions-tasks.ContainerOverride)[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.securityGroups"></a>

- *Type:* [`@aws-cdk/aws-ec2.ISecurityGroup`](#@aws-cdk/aws-ec2.ISecurityGroup)[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.subnets"></a>

- *Type:* [`@aws-cdk/aws-ec2.SubnetSelection`](#@aws-cdk/aws-ec2.SubnetSelection)

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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `image`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.image"></a>

- *Type:* [`@aws-cdk/aws-ecs.ContainerImage`](#@aws-cdk/aws-ecs.ContainerImage)

Container image to run.

---

##### `command`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.command"></a>

- *Type:* `string`[]
- *Default:* use the image's default.

Run this container command.

---

### IntrinsicValidatorProps <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps"></a>

Props for `IntrinsicValidator`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { IntrinsicValidatorProps } from '@wheatstalk/cdk-intrinsic-validator'

const intrinsicValidatorProps: IntrinsicValidatorProps = { ... }
```

##### `stateMachineName`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.stateMachineName"></a>

- *Type:* `string`
- *Default:* CDK automatically picks a name

Name the Step Functions State Machine.

---

##### `validations`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.validations"></a>

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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `lambdaFunction`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.lambdaFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda.IFunction`](#@aws-cdk/aws-lambda.IFunction)

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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `alarm`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.alarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.IAlarm`](#@aws-cdk/aws-cloudwatch.IAlarm)

The alarm to monitor.

---

##### `duration`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.duration"></a>

- *Type:* [`@aws-cdk/core.Duration`](#@aws-cdk/core.Duration)
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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `stateMachine`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.stateMachine"></a>

- *Type:* [`@aws-cdk/aws-stepfunctions.IStateMachine`](#@aws-cdk/aws-stepfunctions.IStateMachine)

The state machine to execute.

---

##### `input`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.input"></a>

- *Type:* [`@aws-cdk/aws-stepfunctions.TaskInput`](#@aws-cdk/aws-stepfunctions.TaskInput)
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

- *Type:* `string`
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

## Classes <a name="Classes"></a>

### Validation <a name="@wheatstalk/cdk-intrinsic-validator.Validation"></a>

Create many types of validations.

#### Initializer <a name="@wheatstalk/cdk-intrinsic-validator.Validation.Initializer"></a>

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




