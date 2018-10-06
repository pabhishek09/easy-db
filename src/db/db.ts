
import { Config } from '../config';
import { setUpCollection } from '../lib/setUpCollection';

import { DbOptions } from '../types/DbOptions';
import { DbConfig } from '../types/DbConfig';

const path = require('path');
const fs = require('fs');

import * as _ from 'lodash';

export class EasyDB {

  constructor () {
  }

  private dbConfig: DbConfig;

  public async connect(dbOptions: DbOptions) {
    // Set the base data directory
    this.dbConfig.baseDir = path.resolve(__dirname, 
      (dbOptions.dir && dbOptions.dir.length>0) ? '.'.concat(dbOptions.dir) : Config.defaultDir);
    // Collection name
    this.dbConfig.collection = (dbOptions.collection && dbOptions.collection.length>0) ? dbOptions.collection : Config.defaultCollection;
    // Set the collection path
    this.dbConfig.collectionPath = path.join(this.dbConfig.baseDir, this.dbConfig.collection);
    // Set up collection
    setUpCollection(this.dbConfig.collectionPath);
    // Read the collection data
    fs.readFile(this.dbConfig.collectionPath , 'utf-8', (err, data) => {
      if (!err && data) {
        this.dbConfig.data = data;
        console.log('Db data resolved');
        console.log(data);
      } else {
        console.log('Error in reading', __dirname);
        throw new Error(err);
      }
    });
    // Read all collections
    fs.readdir(this.dbConfig.baseDir, (err, data) => {
      console.log(data);
      this.dbConfig.collections = data;
    });
  }

  public getDbConfig() {
    return this.dbConfig;
  }

  public async addCollection(name: string) {

  }

  public async removeCollection() {

  }

}
