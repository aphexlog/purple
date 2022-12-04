#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PotatoheadStack } from './lib/eks';

const app = new cdk.App();
const env = app.node.tryGetContext('env');

new PotatoheadStack(app, 'PotatoheadStack', {
  env
});