module.exports = function(app) {
  app.use('/user', require('./user'));
  app.use('/login', require('./login'));
  app.use('/signup', require('./signup'));
}
