
module.exports = function(app, content) {
  app.get('/collection', (req, res) => {
    res.send(content);
  });
};

