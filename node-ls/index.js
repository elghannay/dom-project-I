#!/usr/bin/env node
// npm link
const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
  if (err) console.log(err);

  const arrayStats = Array(files.length).fill(null);
  for (const file of files) {
    const index = files.indexOf(file);

    fs.lstat(file, (err, stats) => {
      if (err) console.log(err);
      arrayStats[index] = stats;

      const ready = arrayStats.every((stats) => {
        return stats;
      });

      if (ready) {
        arrayStats.forEach((stats, index) => {
          console.log(files[index], stats.isFile());
        });
      }
    });
  }
});
