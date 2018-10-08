
import { fs } from 'fs';
import { path } from 'path';

import { Config } from '../config';
import { setUpCollection } from '../lib/setUpCollection';

  export async function connect() {
    console.log('Inside connect function');
    const dbOptions = {};
    const dbConfig = {
      baseDir: path.resolve(__dirname, 
        (dbOptions && dbOptions.dir) ? '.'.concat(dbOptions.dir) : Config.defaultDir),
      collection: (dbOptions && dbOptions.collection) ? dbOptions.collection : Config.defaultCollection,
      collections: [],
      data: ''
    };
    dbConfig['collectionPath']=  path.join(dbConfig.baseDir, dbConfig.collection);
    // Ensure data directory exist
    fs.readdir(dbConfig.baseDir, (err, data) => {
      if (!err && data) {
        dbConfig.collections = data;
        console.log(data);
      } else {
        console.log('Error in reading directory', __dirname);
        throw new Error(err);
      }
    });
    dbConfig.data = await setUpCollection(dbConfig.collectionPath);

    return dbConfig;
    // Serve collection data
    // fs.readFile(this.dbConfig.collectionPath , 'utf-8', (err, data) => {
    //   if (!err && data) {
    //     this.dbConfig.data = data;
    //     console.log('Db data resolved');
    //     console.log(data);
    //   } else {
    //     console.log('Error in reading', __dirname);
    //     throw new Error(err);
    //   }
    // });
  }
