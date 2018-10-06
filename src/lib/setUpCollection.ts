import * as _ from 'lodash';
import { Config } from '../config';
const path = require('path');
const fs = require('fs');
/**
 * Read the data inside the file
 * @param  {string} dir
 * @param  {string} file
 * @param  {function} callback
 */
export function setUpCollection(path: string) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (!err && data) {
      return data;
    } else {
      console.log(path + ' does not exist, creating with default data');
      fs.open(path, 'w', (err, fileDescriptor) => {
        console.log('setting default value to', path);
        fs.writeFile(fileDescriptor, JSON.stringify(Config.defaultData), function(err) {
          if (!err) {
            fs.close(fileDescriptor, function(err) {
              if (err) {
                console.log('Error in closing', fileDescriptor);
                throw new Error(err);
              }
            });
          } else {
            console.log('Error in writing file');
            throw new Error(err);
          }
        })
      });
    }
  });
}
