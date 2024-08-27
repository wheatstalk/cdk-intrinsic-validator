# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### FargateValidationFactory <a name="FargateValidationFactory" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory"></a>

A convenience tool for creating Fargate-based validations.

#### Initializers <a name="Initializers" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer"></a>

```typescript
import { FargateValidationFactory } from '@wheatstalk/cdk-intrinsic-validator'

new FargateValidationFactory(scope: Construct, id: string, props: FargateValidationFactoryProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.props">props</a></code> | <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps">FargateValidationFactoryProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.Initializer.parameter.props"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps">FargateValidationFactoryProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.runContainer">runContainer</a></code> | Produce a validation that uses a container image to run a command. |

---

##### `toString` <a name="toString" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `runContainer` <a name="runContainer" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.runContainer"></a>

```typescript
public runContainer(options: FargateValidationRunContainerOptions): Validation
```

Produce a validation that uses a container image to run a command.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.runContainer.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions">FargateValidationRunContainerOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.isConstruct"></a>

```typescript
import { FargateValidationFactory } from '@wheatstalk/cdk-intrinsic-validator'

FargateValidationFactory.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactory.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### IntrinsicValidator <a name="IntrinsicValidator" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator"></a>

Adds intrinsic validation to a CloudFormation stack.

#### Initializers <a name="Initializers" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer"></a>

```typescript
import { IntrinsicValidator } from '@wheatstalk/cdk-intrinsic-validator'

new IntrinsicValidator(scope: Construct, id: string, props?: IntrinsicValidatorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.props">props</a></code> | <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps">IntrinsicValidatorProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.Initializer.parameter.props"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps">IntrinsicValidatorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.isConstruct"></a>

```typescript
import { IntrinsicValidator } from '@wheatstalk/cdk-intrinsic-validator'

IntrinsicValidator.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidator.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### FargateTaskSucceedsOptions <a name="FargateTaskSucceedsOptions" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions"></a>

Options for Fargate task validations.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.Initializer"></a>

```typescript
import { FargateTaskSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateTaskSucceedsOptions: FargateTaskSucceedsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | The cluster to create the task on. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Assign tasks public IP addresses. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.containerOverrides">containerOverrides</a></code> | <code>aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]</code> | Container overrides. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Give tasks a security group. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Select subnets in which tasks will run. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.TaskDefinition</code> | *No description.* |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="assignPublicIp" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="containerOverrides" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Select subnets in which tasks will run.

---

##### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: TaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

### FargateValidationBaseOptions <a name="FargateValidationBaseOptions" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions"></a>

Base options for Fargate-based validations.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.Initializer"></a>

```typescript
import { FargateValidationBaseOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationBaseOptions: FargateValidationBaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | The cluster to create the task on. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Assign tasks public IP addresses. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.containerOverrides">containerOverrides</a></code> | <code>aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]</code> | Container overrides. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Give tasks a security group. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Select subnets in which tasks will run. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="assignPublicIp" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="containerOverrides" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationBaseOptions.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Select subnets in which tasks will run.

---

### FargateValidationFactoryProps <a name="FargateValidationFactoryProps" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps"></a>

Props for `FargateValidationFactory`.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.Initializer"></a>

```typescript
import { FargateValidationFactoryProps } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationFactoryProps: FargateValidationFactoryProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | The cluster to create the task on. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Assign tasks public IP addresses. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.containerOverrides">containerOverrides</a></code> | <code>aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]</code> | Container overrides. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Give tasks a security group. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Select subnets in which tasks will run. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

The cluster to create the task on.

---

##### `assignPublicIp`<sup>Optional</sup> <a name="assignPublicIp" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean

Assign tasks public IP addresses.

---

##### `containerOverrides`<sup>Optional</sup> <a name="containerOverrides" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.containerOverrides"></a>

```typescript
public readonly containerOverrides: ContainerOverride[];
```

- *Type:* aws-cdk-lib.aws_stepfunctions_tasks.ContainerOverride[]

Container overrides.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Give tasks a security group.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationFactoryProps.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Select subnets in which tasks will run.

---

### FargateValidationRunContainerOptions <a name="FargateValidationRunContainerOptions" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions"></a>

Base options for running containers.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.Initializer"></a>

```typescript
import { FargateValidationRunContainerOptions } from '@wheatstalk/cdk-intrinsic-validator'

const fargateValidationRunContainerOptions: FargateValidationRunContainerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.image">image</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerImage</code> | Container image to run. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.command">command</a></code> | <code>string[]</code> | Run this container command. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `image`<sup>Required</sup> <a name="image" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.image"></a>

```typescript
public readonly image: ContainerImage;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerImage

Container image to run.

---

##### `command`<sup>Optional</sup> <a name="command" id="@wheatstalk/cdk-intrinsic-validator.FargateValidationRunContainerOptions.property.command"></a>

```typescript
public readonly command: string[];
```

- *Type:* string[]
- *Default:* use the image's default.

Run this container command.

---

### HttpCheckSucceedsOptions <a name="HttpCheckSucceedsOptions" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions"></a>

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.Initializer"></a>

```typescript
import { HttpCheckSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const httpCheckSucceedsOptions: HttpCheckSucceedsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.url">url</a></code> | <code>string</code> | URL to check. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPattern">checkPattern</a></code> | <code>string</code> | Check the response body of the URL for this Node-compatible regex pattern. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPatternFlags">checkPatternFlags</a></code> | <code>string</code> | Regex pattern flags. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.expectedStatus">expectedStatus</a></code> | <code>string \| number</code> | Expect an HTTP status. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.followRedirects">followRedirects</a></code> | <code>boolean</code> | Follow redirects when performing the check. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryStatus">retryStatus</a></code> | <code>string</code> | Retry the check if the given http status is resolved. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryUntilTimeout">retryUntilTimeout</a></code> | <code>boolean</code> | Continue to retry the check until the timeout is reached. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | Maximum time to wait for a response. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `url`<sup>Required</sup> <a name="url" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

URL to check.

---

##### `checkPattern`<sup>Optional</sup> <a name="checkPattern" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPattern"></a>

```typescript
public readonly checkPattern: string;
```

- *Type:* string
- *Default:* Only HTTP status is checked

Check the response body of the URL for this Node-compatible regex pattern.

---

##### `checkPatternFlags`<sup>Optional</sup> <a name="checkPatternFlags" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.checkPatternFlags"></a>

```typescript
public readonly checkPatternFlags: string;
```

- *Type:* string
- *Default:* No flags

Regex pattern flags.

---

##### `expectedStatus`<sup>Optional</sup> <a name="expectedStatus" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.expectedStatus"></a>

```typescript
public readonly expectedStatus: string | number;
```

- *Type:* string | number
- *Default:* 200

Expect an HTTP status.

---

##### `followRedirects`<sup>Optional</sup> <a name="followRedirects" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.followRedirects"></a>

```typescript
public readonly followRedirects: boolean;
```

- *Type:* boolean
- *Default:* false

Follow redirects when performing the check.

---

##### `retryStatus`<sup>Optional</sup> <a name="retryStatus" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryStatus"></a>

```typescript
public readonly retryStatus: string;
```

- *Type:* string
- *Default:* no retries

Retry the check if the given http status is resolved.

---

##### `retryUntilTimeout`<sup>Optional</sup> <a name="retryUntilTimeout" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.retryUntilTimeout"></a>

```typescript
public readonly retryUntilTimeout: boolean;
```

- *Type:* boolean
- *Default:* false

Continue to retry the check until the timeout is reached.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

Maximum time to wait for a response.

---

### IntrinsicValidatorProps <a name="IntrinsicValidatorProps" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps"></a>

Props for `IntrinsicValidator`.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.Initializer"></a>

```typescript
import { IntrinsicValidatorProps } from '@wheatstalk/cdk-intrinsic-validator'

const intrinsicValidatorProps: IntrinsicValidatorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.stateMachineName">stateMachineName</a></code> | <code>string</code> | Name the Step Functions State Machine. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.validations">validations</a></code> | <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation">Validation</a>[]</code> | Validations to run every time the stack is deployed. |

---

##### `stateMachineName`<sup>Optional</sup> <a name="stateMachineName" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.stateMachineName"></a>

```typescript
public readonly stateMachineName: string;
```

- *Type:* string
- *Default:* CDK automatically picks a name

Name the Step Functions State Machine.

---

##### `validations`<sup>Optional</sup> <a name="validations" id="@wheatstalk/cdk-intrinsic-validator.IntrinsicValidatorProps.property.validations"></a>

```typescript
public readonly validations: Validation[];
```

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.Validation">Validation</a>[]
- *Default:* no validations are run

Validations to run every time the stack is deployed.

---

### LambdaInvokeSucceedsOptions <a name="LambdaInvokeSucceedsOptions" id="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions"></a>

Options for lambda validations.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.Initializer"></a>

```typescript
import { LambdaInvokeSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const lambdaInvokeSucceedsOptions: LambdaInvokeSucceedsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function to invoke. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function to invoke.

If there's an error, throw from within your function.

---

### MonitorAlarmOptions <a name="MonitorAlarmOptions" id="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions"></a>

Options for monitoring alarms.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.Initializer"></a>

```typescript
import { MonitorAlarmOptions } from '@wheatstalk/cdk-intrinsic-validator'

const monitorAlarmOptions: MonitorAlarmOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.alarm">alarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarm</code> | The alarm to monitor. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.duration">duration</a></code> | <code>aws-cdk-lib.Duration</code> | The length of time to monitor the alarm. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `alarm`<sup>Required</sup> <a name="alarm" id="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.alarm"></a>

```typescript
public readonly alarm: IAlarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarm

The alarm to monitor.

---

##### `duration`<sup>Optional</sup> <a name="duration" id="@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions.property.duration"></a>

```typescript
public readonly duration: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* one minute

The length of time to monitor the alarm.

---

### StateMachineExecutionSucceedsOptions <a name="StateMachineExecutionSucceedsOptions" id="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions"></a>

Options for step function validations.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.Initializer"></a>

```typescript
import { StateMachineExecutionSucceedsOptions } from '@wheatstalk/cdk-intrinsic-validator'

const stateMachineExecutionSucceedsOptions: StateMachineExecutionSucceedsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.stateMachine">stateMachine</a></code> | <code>aws-cdk-lib.aws_stepfunctions.IStateMachine</code> | The state machine to execute. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.input">input</a></code> | <code>aws-cdk-lib.aws_stepfunctions.TaskInput</code> | Input for the state machine's execution. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.stateMachine"></a>

```typescript
public readonly stateMachine: IStateMachine;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.IStateMachine

The state machine to execute.

---

##### `input`<sup>Optional</sup> <a name="input" id="@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions.property.input"></a>

```typescript
public readonly input: TaskInput;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.TaskInput
- *Default:* no input given

Input for the state machine's execution.

---

### ValidationBaseOptions <a name="ValidationBaseOptions" id="@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions"></a>

Base options for validations.

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions.Initializer"></a>

```typescript
import { ValidationBaseOptions } from '@wheatstalk/cdk-intrinsic-validator'

const validationBaseOptions: ValidationBaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions.property.label">label</a></code> | <code>string</code> | Label references to this validation for easier identification. |

---

##### `label`<sup>Optional</sup> <a name="label" id="@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions.property.label"></a>

```typescript
public readonly label: string;
```

- *Type:* string
- *Default:* Automatic label based on the validation type

Label references to this validation for easier identification.

---

## Classes <a name="Classes" id="Classes"></a>

### Validation <a name="Validation" id="@wheatstalk/cdk-intrinsic-validator.Validation"></a>

Create many types of validations.

#### Initializers <a name="Initializers" id="@wheatstalk/cdk-intrinsic-validator.Validation.Initializer"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

new Validation(options: ValidationBaseOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.Initializer.parameter.options">options</a></code> | <code><a href="#@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions">ValidationBaseOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.Validation.Initializer.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.ValidationBaseOptions">ValidationBaseOptions</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.alwaysFails">alwaysFails</a></code> | Create a validation that always fails. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.alwaysSucceeds">alwaysSucceeds</a></code> | Create a validation that always succeeds. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.fargateTaskSucceeds">fargateTaskSucceeds</a></code> | Create a validation that runs a fargate task and waits for it to succeed. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.httpCheck">httpCheck</a></code> | Create a validation that checks. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.lambdaInvokeSucceeds">lambdaInvokeSucceeds</a></code> | Create a validation that invokes a lambda function. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.monitorAlarm">monitorAlarm</a></code> | Create a validation that monitors an alarm. |
| <code><a href="#@wheatstalk/cdk-intrinsic-validator.Validation.stateMachineExecutionSucceeds">stateMachineExecutionSucceeds</a></code> | Create a validation that executes a Step Functions state machine. |

---

##### `alwaysFails` <a name="alwaysFails" id="@wheatstalk/cdk-intrinsic-validator.Validation.alwaysFails"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.alwaysFails()
```

Create a validation that always fails.

##### `alwaysSucceeds` <a name="alwaysSucceeds" id="@wheatstalk/cdk-intrinsic-validator.Validation.alwaysSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.alwaysSucceeds()
```

Create a validation that always succeeds.

##### `fargateTaskSucceeds` <a name="fargateTaskSucceeds" id="@wheatstalk/cdk-intrinsic-validator.Validation.fargateTaskSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.fargateTaskSucceeds(options: FargateTaskSucceedsOptions)
```

Create a validation that runs a fargate task and waits for it to succeed.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.Validation.fargateTaskSucceeds.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.FargateTaskSucceedsOptions">FargateTaskSucceedsOptions</a>

---

##### `httpCheck` <a name="httpCheck" id="@wheatstalk/cdk-intrinsic-validator.Validation.httpCheck"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.httpCheck(param: HttpCheckSucceedsOptions)
```

Create a validation that checks.

###### `param`<sup>Required</sup> <a name="param" id="@wheatstalk/cdk-intrinsic-validator.Validation.httpCheck.parameter.param"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.HttpCheckSucceedsOptions">HttpCheckSucceedsOptions</a>

---

##### `lambdaInvokeSucceeds` <a name="lambdaInvokeSucceeds" id="@wheatstalk/cdk-intrinsic-validator.Validation.lambdaInvokeSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.lambdaInvokeSucceeds(options: LambdaInvokeSucceedsOptions)
```

Create a validation that invokes a lambda function.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.Validation.lambdaInvokeSucceeds.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.LambdaInvokeSucceedsOptions">LambdaInvokeSucceedsOptions</a>

---

##### `monitorAlarm` <a name="monitorAlarm" id="@wheatstalk/cdk-intrinsic-validator.Validation.monitorAlarm"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.monitorAlarm(options: MonitorAlarmOptions)
```

Create a validation that monitors an alarm.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.Validation.monitorAlarm.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.MonitorAlarmOptions">MonitorAlarmOptions</a>

---

##### `stateMachineExecutionSucceeds` <a name="stateMachineExecutionSucceeds" id="@wheatstalk/cdk-intrinsic-validator.Validation.stateMachineExecutionSucceeds"></a>

```typescript
import { Validation } from '@wheatstalk/cdk-intrinsic-validator'

Validation.stateMachineExecutionSucceeds(options: StateMachineExecutionSucceedsOptions)
```

Create a validation that executes a Step Functions state machine.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-intrinsic-validator.Validation.stateMachineExecutionSucceeds.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-intrinsic-validator.StateMachineExecutionSucceedsOptions">StateMachineExecutionSucceedsOptions</a>

---




