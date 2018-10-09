const easyDb = require('./src/index.js');

console.log(easyDb);

console.log('Connecting to easy db');

console.log(easyDb.connect(__dirname));
