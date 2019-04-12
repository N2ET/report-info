#!/usr/bin/env node
 
const program = require('commander');
const lib = require('../lib/index');
const logger = require('../lib/log');
 
program
  .version('1.0.0', '-v, --version')
  .option('-d, --debug', 'debug log')
  .option('-p, --extra-data-path [extraDataPath]', 'extra-data-path')
  .option('-n, --no-upload', 'do not upload data')
  .option('-u, --uri [uri]', 'upload uri')
  .parse(process.argv);

if (program.debug) {
    console.log(program);
}

let uri = program.uri || '';

logger.setDebug(program.debug);
lib.report({
    uri: uri,
    noUpload: !program.upload,
    extraDataPath: program.extraDataPath
});