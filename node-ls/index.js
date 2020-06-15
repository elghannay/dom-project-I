#!/usr/bin/env node
// npm link
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// adding arguments to our command line instruction.
// console.log(process.argv);
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
  if (err) console.log(err);

  /***************************************/
  /************** BAD CODE ***************/
  /***************************************/

  // each time the callbacks are executed at a different order.

  //   for (const file of files) {
  //     fs.lstat(file, (err, stats) => {
  //       if (err) console.log(err);
  //       console.log(file, stats.isFile());
  //     });
  //   }

  /***************************************/
  /********** END BAD CODE ***************/
  /***************************************/

  /***************************************/
  /********** second solution ************/
  /***************************************/

  //   the downside is that this solution get pretty complex
  //   rather quickly especially if you have promises inside.
  //   a callback based approach, maintain an array of the results
  // from each lstat, add the stat object to this array
  // once the array is full log it.

  //   const arrayStats = Array(files.length).fill(null);
  //   for (const file of files) {
  //     const index = files.indexOf(file);

  //     fs.lstat(file, (err, stats) => {
  //       if (err) console.log(err);
  //       arrayStats[index] = stats;

  //       const ready = arrayStats.every((stats) => {
  //         return stats;
  //       });

  //       if (ready) {
  //         arrayStats.forEach((stats, index) => {
  //           console.log(files[index], stats.isFile());
  //         });
  //       }
  //     });
  //   }
  /***************************************/
  /******** end second solution **********/
  /***************************************/

  /***************************************/
  /********   third solution    **********/
  /***************************************/

  //   a promise based solution.Engine
  //   method 1 creating a promise base solution on our own

  //   const lstat = (fileName) => {
  //     return new Promise((resolve, reject) => {
  //       fs.lstat(fileName, (err, stats) => {
  //         if (err) reject();
  //         if (stats) resolve(stats);
  //       });
  //     });
  //   };

  //   method 2 leveraging an internal function of node.

  //   const util = require('util');
  //   const lstat = util.promisify(fs.lstat);

  //   method 3 using already defined promise based methods of node.

  const { lstat } = require('fs').promises;

  //   the key takeaway is that we should note that we can convert
  //   node call back implementation into a promise using three different ways
  //   either by declaring a promise ourselves or by using the util.promisify
  //   or lastly by leveraging a promise version of the function that we want to use.

  //   for (const file of files) {
  //     try {
  //       const stats = await lstat(file);
  //       console.log(file, stats.isFile());
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  /***************************************/
  /**********  GOOD  CODE  ***************/
  /***************************************/
  //   we run all the promises code in parallel which mean that we may get a better performance.
  //   loop on each file and return promise stat that get created when we call lstat.
  const statsPromises = files.map((file) => lstat(path.join(targetDir, file)));
  //   waiting for the promises to be resolved. and store the resulting array in statsArray
  const statsArray = await Promise.all(statsPromises);
  for (const stat of statsArray) {
    const index = statsArray.indexOf(stat);
    if (stat.isFile()) {
      console.log(chalk.blue(files[index]));
    } else console.log(chalk.bold(files[index]));
  }
});
