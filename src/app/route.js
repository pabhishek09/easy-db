const collection = require('./routes/collection');

module.exports = function(app, content) {
  collection(app, content);
};

