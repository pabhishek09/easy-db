
const fs = require('fs');
const path = require('path');

const Config = require('./config');
const serve = require('./serve');
const db = {};

module.exports = function connect(dbBaseUrl) {
  const dbOptions= {};
    console.log('Inside connect function');
    db['baseUrl'] = path.resolve(dbBaseUrl, (dbOptions && dbOptions.dir) ? '.'.concat(dbOptions.dir) : Config.defaultDir);
    if (!fs.existsSync(db['baseUrl'])){
      fs.mkdirSync(db['baseUrl']);
    }
    fs.readdir(db['baseUrl'], (err, data) => {
      if (!err && data) {
        if (data.length>0) {
          db['tables'] = [];
          data.forEach((tablePath) => {
            if (path.extname(tablePath) === Config.dataExt) {
              db.tables.push(tablePath.replace(/.json/, ''));
            }
          });
        } else {
          db['tables'] = [ Config.defaultTable ];
        }
        serve(db);
      } else {
        console.log('Error in reading directory', __dirname);
        throw new Error(err);
      }
    });
}
