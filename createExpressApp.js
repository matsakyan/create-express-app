const { Command } = require('commander');
const { green, red } = require('chalk');
const validateName = require('validate-npm-package-name');

const packageJSON = require('./package.json');

let projectName;

const programm = new Command(green(packageJSON.name))
  .version(packageJSON.version, '-v, --version')
  .usage(green('<project-name> [options]'))
  .arguments('<project-name>')
  .action(name => projectName = name)
  .parse(process.argv)

checkName(projectName);

function checkName(name) {
  // TODO ::: Project can't have same name as it's dependencies
  if (!name) {
    console.log(red('Please specify project name'));
    console.log();
    console.log(`Run ${green('create-react-app --help')} to see all options.`);
    process.exit(1);
  }

  const {
    validForNewPackages,
    errors,
    warnings,
  } = validateName(name);

  if (!validForNewPackages) {
    console.log(`${red(name)} is not a valid npm package name.`);
    errors && console.log();
    errors && console.log(red(errors.join('\n')));
    warnings && console.log();
    warnings && console.log(red(warnings.join('\n')));
    process.exit(1);
  }
}
