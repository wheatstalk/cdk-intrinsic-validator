const pj = require('projen');
const project = new pj.AwsCdkConstructLibrary({
  author: 'Josh Kellendonk',
  authorAddress: 'joshkellendonk@gmail.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'master',
  name: '@wheatstalk/cdk-intrinsic-validator',
  repositoryUrl: 'https://github.com/wheatstalk/cdk-intrinsic-validator.git',
  description: 'Make deployments safer by adding intrinsic validation to your stacks',

  keywords: [
    'cdk',
    'fargate',
    'testing',
    'deployment',
    'rollback',
    'cloudformation',
    'projen',
  ],

  releaseEveryCommit: true,
  releaseToNpm: true,

  projenUpgradeSecret: 'YARN_UPGRADE_TOKEN',
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['github-actions', 'github-actions[bot]', 'misterjoshua'],
  },

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-stepfunctions',
    '@aws-cdk/aws-stepfunctions-tasks',
  ],

  devDeps: [
    'ts-node@^9',
    'aws-cdk@^1.95.2',
    'aws-sdk@^2.963.0',
    'markmac@^0.1',
    'shx',
    '@wheatstalk/lit-snip@^0.0',
  ],

  gitignore: [
    'cdk.context.json',
    'cdk.out',
    '.idea',
    '*.iml',
  ],

  npmignore: [
    'cdk.context.json',
    'cdk.out',
    '.idea',
    '*.iml',
    '/images',
  ],

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});

project.package.setScript('integ:dev', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.dev.ts"');
project.package.setScript('integ:main', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.main.lit.ts"');
project.package.setScript('integ:fargate', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.fargate.lit.ts"');
project.package.setScript('integ:cloudwatch-alarm', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.cloudwatch-alarm.lit.ts"');
project.package.setScript('integ:lambda', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.lambda.lit.ts"');
project.package.setScript('integ:step-function', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.step-function.lit.ts"');
project.package.setScript('integ:alarm-monitor', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.alarm-monitor.ts"');
project.package.setScript('integ:error-message', 'cdk --app "ts-node -P tsconfig.jest.json test/integ/integ.error-message.ts"');

const macros = project.addTask('readme-macros');
macros.exec('shx mv README.md README.md.bak');
macros.exec('shx cat README.md.bak | markmac > README.md');
macros.exec('shx rm README.md.bak');
project.buildTask.spawn(macros);

project.synth();