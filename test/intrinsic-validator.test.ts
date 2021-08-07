import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { IntrinsicValidator } from '../src';

it('produces a state machine', () => {
  // GIVEN
  const stack = new cdk.Stack();

  // WHEN
  new IntrinsicValidator(stack, 'Intrinsic');

  // THEN
  expectCDK(stack).to(haveResource('AWS::StepFunctions::StateMachine'));
});