
const fs = require('fs');
const path = require('path');

const Config = require('../config');
const setUpCollection = require('./setUpCollection');

module.exports = function connect(dbBaseUrl) {
    console.log('Inside connect function');
    const dbOptions = {};
    const dbConfig = {
      baseDir: path.resolve(dbBaseUrl, 
        (dbOptions && dbOptions.dir) ? '.'.concat(dbOptions.dir) : Config.defaultDir),
      collection: (dbOptions && dbOptions.collection) ? dbOptions.collection : Config.defaultCollection,
      collections: []
    };
    dbConfig['collectionPath']=  path.join(dbConfig.baseDir, dbConfig.collection).concat(Config.dataExt);
    // Ensure data directory exist
    if (!fs.existsSync(dbConfig.baseDir)){
      fs.mkdirSync(dbConfig.baseDir);
    }
    setUpCollection(dbConfig, () => {
      fs.readdir(dbConfig.baseDir, (err, data) => {
        if (!err && data) {
          dbConfig.collections = data;
          return dbConfig;
        } else {
          console.log('Error in reading directory', __dirname);
          throw new Error(err);
        }
      });
    });
  }
