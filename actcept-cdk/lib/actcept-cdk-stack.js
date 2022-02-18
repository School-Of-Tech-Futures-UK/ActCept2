const { Stack, CfnOutput, RemovalPolicy } = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const iam = require('aws-cdk-lib/aws-iam');
const s3deploy = require('aws-cdk-lib/aws-s3-deployment');
class ActceptCdkStack extends Stack {

  /**   
   * 
   * @param {Construct} scope   
   * @param {string} id   
   * @param {StackProps=} props   
   */
  
  constructor(scope, id, props) {
    super(scope, id, props);
    
    const myBucket = new s3.Bucket(this, 'FileBucket', {
      bucketName: 'actcept-cdk-bucket',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // encryption: s3.BucketEncryption.KMS_MANAGED,      
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
    });

    myBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.StarPrincipal()],
        actions: ['s3:*'],
        resources: [
          myBucket.bucketArn,
          `${myBucket.bucketArn}/*`        ],
        conditions: {
          "IpAddress": {
            "aws:SourceIp": "80.192.142.215"          }
        }
      }),
    );

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../client')],
      destinationBucket: myBucket,
    });

    new CfnOutput(this, 'WebsiteURL', {
      value: myBucket.bucketWebsiteUrl,
    });
    
  }
}
module.exports = { ActceptCdkStack }