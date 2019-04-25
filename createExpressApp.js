const { Command } = require('commander');
const { green, red } = require('chalk');
const validateName = require('validate-npm-package-name');
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');

const packageJSON = require('./package.json');

const deps = ['express', 'nconf'];
const devDeps = ['nodemon', 'cors'];

let projectName;

new Command(green(packageJSON.name))
  .version(packageJSON.version, '-v, --version')
  .usage(green('<project-name> [options]'))
  .arguments('<project-name>')
  .action(name => projectName = name)
  .parse(process.argv);

start(projectName);

function start(name) {
  checkName(name);

  const root = path.resolve(name);

  fs.ensureDirSync(root);

  console.log(`Creating a new Express app in ${green(root)}`);
  console.log();

  const packageJSON = {
    name,
    version: '1.0.0',
    private: true,
    description: "",
    main: "index.js",
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJSON, null, 2),
  );

  process.chdir(root);

  console.log('Installing dependencies...');
  npmInstall();
}

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

function npmInstall() {
  // TODO ::: check exit code
  spawn('npm', ['install'].concat(deps), { stdio: 'inherit' });
  spawn('npm', ['install', '--save-dev'].concat(devDeps), { stdio: 'inherit' });
}
