const fs = require('fs');
const path = require('path');
const url = require('url');

const Config = require('../config');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
dotenv.config();

module.exports = function serve(db) { 
  const port = process.env.PORT || 3000;
  process.env.NODE_ENV = 'dev' ? app.use(morgan('dev')) : app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.listen(port, () => console.log(`EasyDb running on port ${port}!`));
  app.get('/tables', (req, res) => {
    res.send(db.tables);
  });
  db['tableRoutes'] = db.tables.map((tableName) => {
    return {
      name: tableName,
      path: path.join(db.baseUrl, tableName).concat(Config.dataExt)
    }
  });
  db.tableRoutes.forEach(table => {
   readTableData(table, createTableRoute);
  });
  app.use('/shell', express.static(path.normalize(__dirname + '/../app/client')));
  fs.watch(db.baseUrl, (eventType, filename) => {
    if (filename) {

    }
  });
};

function readTableData(table, callback) {
  const tablePath = table.path;
  fs.readFile(tablePath, 'utf-8', (err, data) => {
    if (!err && data) {
      callback(table.name, data);
    } else {
      console.log(tablePath + ' does not exist, creating with default data');
      fs.open(tablePath, 'w', (err, fileDescriptor) => {
        fs.writeFile(fileDescriptor, JSON.stringify(Config.defaultData), function(err) {
          if (!err) {
            fs.close(fileDescriptor, function(err) {
              if (err) {
                console.log('Error in closing', fileDescriptor);
                return new Error(err);
              } else {
                callback(table.name, Config.defaultData);
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

function createTableRoute(name, data) {
  const tableUrl = '/tables/'.concat(name);
  console.log('Creating express route to get ', tableUrl);
  app.get(tableUrl, (req, res) => {
    res.send(data);
  });
}
