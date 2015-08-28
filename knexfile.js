var config = require('config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: config.get('db.connection')
  }
};
