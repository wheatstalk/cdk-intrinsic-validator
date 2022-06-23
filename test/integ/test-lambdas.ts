import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

const ALWAYS_FAILS_SRC = `
def handler(event, context):
  raise Exception('An expected failure')
`;
const ALWAYS_SUCCEEDS_SRC = `
def handler(event, context):
  return 'it works'
`;

/**
 * Create some test lambdas.
 * @internal
 */
export class TestLambdas extends Construct {
  /** A lambda that always fails */
  public readonly alwaysFails: lambda.IFunction;
  /** A lambda that always succeeds */
  public readonly alwaysSucceeds: lambda.IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.alwaysFails = new lambda.Function(scope, 'AlwaysFails', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.handler',
      code: lambda.Code.fromInline(ALWAYS_FAILS_SRC),
    });
    this.alwaysSucceeds = new lambda.Function(scope, 'AlwaysSucceeds', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.handler',
      code: lambda.Code.fromInline(ALWAYS_SUCCEEDS_SRC),
    });
  }
}