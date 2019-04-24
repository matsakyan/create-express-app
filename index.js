#!/usr/bin/env node

const { red } = require('chalk');

const version = process.versions.node;
const major = Number(version.split('.')[0]);

if (major < 6) {
  console.log(red(
    `You are using Node version ${version}.\n`
    + 'Create Express App requires Node 6 or higher.'
  ));
  process.exit(1);
}

require('./createExpressApp.js');
