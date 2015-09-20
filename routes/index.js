module.exports = function(app) {
  app.use('/user', require('./person'));
  app.use('/login', require('./login'));
  app.use('/signup', require('./signup'));
};
