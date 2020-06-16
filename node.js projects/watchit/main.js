#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

// child processes allow us to run programs inside our node program

program
  .version('1.0.0')
  .argument('[fileName]', 'fileName to execute')
  .action(async ({ fileName }) => {
    const name = fileName || 'index.js';
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`cannot access the file "${name}"`);
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log('<<<<<<< program changed >>>>>>');
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);

// the problem with the add event is, every time the program start
// chokidar will try to register each file on the directory as been added
// and since the default behavior of our tool will mark it as file change then
// it will stop the execution of the code and then rerun it again >
//  and by rerun it,  chokidar will considered it as 'adding the file' >
// as many times as the number of files on our folder.so we need to debounce this function.
