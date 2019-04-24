const programm = require('commander');

const packageJSON = require('./package.json');

programm
  .version(packageJSON.version, '-v, --version')
  .parse(process.argv)
