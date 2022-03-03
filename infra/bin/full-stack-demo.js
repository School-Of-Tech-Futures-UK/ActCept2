#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { FullStackDemoStack } = require('../lib/full-stack-demo-stack');

const app = new cdk.App();
new FullStackDemoStack(app, 'ActceptCdkStack2', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },

  certId: "ee0d0edf-96e4-41f4-a3f9-7f81244fc744",
  dbSecret: "gigstrrdsclusterSecretD2C8F-28IADAGMhkzr",
  dbSecurityGroup: "sg-0554b02dc17ffb4ca",
  domainName: "sotf2022-01.com",
  subDomain: 'bookings'

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});