import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class PotatoheadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'myVpc', {
        vpcName: 'myVpc',
        maxAzs: 2,
        subnetConfiguration: [
          {
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
        ],
      });

    const cluster = new eks.Cluster(this, 'Cluster', {
      clusterName: 'elevator-robot-cluster',
      version: eks.KubernetesVersion.V1_23,
      kubectlMemory: cdk.Size.mebibytes(512),
      vpc: vpc,
      vpcSubnets: [{
        subnets: vpc.privateSubnets,
      }],
    });

    const serviceAccount = new eks.ServiceAccount(this, 'ServiceAccount', {
      cluster: cluster,
      name: 'elevator-robot-service-account',
      namespace: 'default',
    });

//     const policy = new iam.Policy(this, 'Policy', {
//       policyName: 'elevator-robot-policy',
//       statements: [
//         new iam.PolicyStatement({
//           effect: iam.Effect.ALLOW,
//           actions: [
//             'ec2:*',
//           ],
//           resources: ['*'],
//         }),
//       ],
//     });

//     serviceAccount.role.attachInlinePolicy(policy);

//     cluster.addManifest('ServiceAccount', {
//       apiVersion: 'v1',
//       kind: 'ServiceAccount',
//       metadata: {
//         name: 'elevator-robot-service-account',
//         namespace: 'default',
//       },
//     });

//     cluster.addManifest('ClusterRole', {
//       apiVersion: 'rbac.authorization.k8s.io/v1',
//       kind: 'ClusterRole',
//       metadata: {
//         name: 'elevator-robot-cluster-role',
//       },
//       rules: [
//         {
//           apiGroups: [''],
//           resources: ['pods'],
//           verbs: ['get', 'list', 'watch'],
//         },
//       ],
//     });

//     cluster.addManifest('ClusterRoleBindin', {
//       apiVersion: 'rbac.authorization.k8s.io/v1',
//       kind: 'ClusterRoleBinding',
//       metadata: {
//         name: 'elevator-robot-cluster-role-binding',
//       },
//       roleRef: {
//         apiGroup: 'rbac.authorization.k8s.io',
//         kind: 'ClusterRole',
//         name: 'elevator-robot-cluster-role',
//       },
//       subjects: [
//         {
//           kind: 'ServiceAccount',
//           name: 'elevator-robot-service-account',
//           namespace: 'default',
//         },
//       ],
//     });

    // cluster.addHelmChart('HelmChart', {
    //   chart: 'elevator-robot',
    //   repository: 'https://elevator-robot-charts.s3.amazonaws.com',
    //   release: 'elevator-robot',
    //   namespace: 'default',
    //   values: {
    //     image: {
    //       repository: 'elevator-robot',
    //       tag: 'latest',
    //     },
    //   },
    // });


  }
}
