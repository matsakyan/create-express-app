const { Command } = require('commander');
const { green, red } = require('chalk');

const packageJSON = require('./package.json');

let name;

const programm = new Command(green(packageJSON.name))
  .version(packageJSON.version, '-v, --version')
  .usage(green('<project-name> [options]'))
  .arguments('<project-name>')
  .action(n => name = n)
  .parse(process.argv)

if (!name) {
  console.log(red('Please specify project name'));
  console.log();
  console.log(`Run ${green('create-react-app --help')} to see all options.`);
  process.exit(1);
}
