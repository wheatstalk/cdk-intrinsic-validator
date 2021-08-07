# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FargateValidationFactory <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory"></a>

Creates a convenient factory for Fargate-based validations.

The given props
applied as defaults for all produced Fargate validations.

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
public runContainer(image: ContainerImage, command: string)
```

###### `image`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.image"></a>

- *Type:* [`@aws-cdk/aws-ecs.ContainerImage`](#@aws-cdk/aws-ecs.ContainerImage)

The ECS container image to run.

---

###### `command`<sup>Required</sup> <a name="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.parameter.command"></a>

- *Type:* `string`

The command to run in the container.

---




### IntrinsicValidator <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator"></a>

Adds intrinsic validation to a CloudFormation stack so that when one of the given validations fails, the stack will automatically roll back.

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

### IntrinsicValidatorProps <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps"></a>

Props for `IntrinsicValidator`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { IntrinsicValidatorProps } from '@wheatstalk/cdk-intrinsic-validator'

const intrinsicValidatorProps: IntrinsicValidatorProps = { ... }
```

##### `validations`<sup>Optional</sup> <a name="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.validations"></a>

- *Type:* [`@wheatstalk/cdk-intrinsic-validator.Validation`](#@wheatstalk/cdk-intrinsic-validator.Validation)[]
- *Default:* no validations are run

Validations to run every time the stack is deployed.

---

## Classes <a name="Classes"></a>

### Validation <a name="@wheatstalk/cdk-intrinsic-validator.Validation"></a>

Create many types of validations.

#### Initializer <a name="@wheatstalk/cdk-intrinsic-validator.Validation.Initializer"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

new Validation()
```


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




