const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
dotenv.config();

module.exports = function serve(content, options) { 
  const port = process.env.PORT || 3000;
  process.env.NODE_ENV = 'dev' ? app.use(morgan('dev')) : app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  app.use('/shell', express.static(path.normalize(__dirname + '/../app/client')));
  require('../app/route')(app, content);
};
