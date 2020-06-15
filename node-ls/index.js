#!/usr/bin/env node
// npm link
const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
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
  //   the downside is that this solution get pretty complex rather quickly
  //   especially if you have promises inside.

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
  //   const stat = util.promisify(fs.stat);

  //   method 3 using already defined promise based methods of node.

  //   const util = require('util');
  //   const stat = util.promisify(fs.stat);
});
