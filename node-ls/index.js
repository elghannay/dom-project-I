const fs = require('fs');
fs.readdir(process.cwd(), (err, files) => {
  // if err the error object will be returned
  // otherwise the err = null;
  if (err) console.log(err);
  console.log(files);
});
