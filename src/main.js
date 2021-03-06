import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import os from 'os'
const access = promisify(fs.access);
const copy = promisify(ncp);


async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function initGit(options) {
 const result = await execa('git', ['init'], {
   cwd: options.targetDirectory,
 });
 if (result.failed) {
   return Promise.reject(new Error('Failed to initialize git'));
 }
 return;
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd()
 };


 let templateDir;

 if(os.type() == 'Windows_NT'){
   templateDir =  path.join(__dirname, "..", "templates");
    options.templateDirectory = templateDir
 } else{
   templateDir = path.resolve(
   new URL(import.meta.url).pathname,
   '../../templates',
   options.template)
   options.templateDirectory = templateDir
 }

 try {
   await access(templateDir, fs.constants.F_OK);
 } catch (err) {
   console.error(`%s Invalid template name: ${err}`, chalk.red.bold('ERROR'));
   process.exit(1);
 }

 const tasks = new Listr([
   {
     title: 'Copy project files',
     task: () => copyTemplateFiles(options),
   },
   {
     title: 'Initialize git',
     task: () => initGit(options),
     enabled: () => options.git,
   },
   {
     title: 'Install dependencies',
     task: () =>
       projectInstall({
         cwd: options.targetDirectory,
       }),
     skip: () =>
       !options.runInstall
         ? 'Pass --install to automatically install dependencies'
         : undefined,
   },
 ]);

 await tasks.run();
  console.log(`%s Project ready if you didn't install dependencies, please npm install and then npm start (localhost:5000)`, chalk.green.bold('DONE'));
 return true;
}
