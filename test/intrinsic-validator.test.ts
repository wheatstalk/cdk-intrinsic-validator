import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DisableRandomnessContextKey, IntrinsicValidator } from '../src';

it('provides a random resource id', () => {
  // GIVEN
  const stack = new cdk.Stack();

  // WHEN
  const validator = new IntrinsicValidator(stack, 'Intrinsic');

  // THEN
  expect(validator.node.tryFindChild('Resource')).toBeUndefined();
  expect(validator.node.children.some(node => node.node.id.match(/^Resource\d+/))).toBeTruthy();
});

it('provides a stable resource id with context', () => {
  const app = new cdk.App({
    context: { [DisableRandomnessContextKey]: true },
  });
  const stack = new cdk.Stack(app);

  // WHEN
  const validator = new IntrinsicValidator(stack, 'Intrinsic');

  // THEN
  expect(validator.node.tryFindChild('Resource')).toBeDefined();
  expect(validator.node.children.some(node => node.node.id.match(/^Resource\d+/))).toBeFalsy();
});


it('produces a state machine', () => {
  // GIVEN
  const stack = new cdk.Stack();

  // WHEN
  new IntrinsicValidator(stack, 'Intrinsic');

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::StepFunctions::StateMachine', {});
});