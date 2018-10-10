const fs = require('fs');

const Config = require('../config');
const serve = require('./serve');

/**
 * Read the data inside the file
 * @param  {string} dir
 * @param  {string} file
 * @param  {function} callback
 */
module.exports = function setUpCollection(dbOptions, callback) {
  const path = dbOptions.collectionPath;
  fs.readFile(path, 'utf-8', (err, data) => {
    if (!err && data) {
      console.log('In read function');
      console.log(data);
      serve(data, {});
      callback();
    } else {
      console.log(path + ' does not exist, creating with default data');
      fs.open(path, 'w', (err, fileDescriptor) => {
        console.log('setting default value to', path);
        fs.writeFile(fileDescriptor, JSON.stringify(Config.defaultData), function(err) {
          if (!err) {
            fs.close(fileDescriptor, function(err) {
              if (err) {
                console.log('Error in closing', fileDescriptor);
                return new Error(err);
              } else {
                serve(Config.defaultData, {});
                callback();
              }
            });
          } else {
            console.log('Error in writing file');
            return new Error(err);
          }
        })
      });
    }
  });
}
