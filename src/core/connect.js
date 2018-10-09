
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
      collections: [],
      data: ''
    };
    dbConfig['collectionPath']=  path.join(dbConfig.baseDir, dbConfig.collection).concat(Config.dataExt);
    // Ensure data directory exist
    if (!fs.existsSync(dbConfig.baseDir)){
      fs.mkdirSync(dbConfig.baseDir);
    }
    fs.readdir(dbConfig.baseDir, (err, data) => {
      if (!err && data) {
        dbConfig.collections = data;
        console.log(data);
      } else {
        console.log('Error in reading directory', __dirname);
        throw new Error(err);
      }
    });
    setUpCollection(dbConfig);
    return dbConfig;
  }
