var config = require('config');
var pg = require('knex')(config.get('db'));

module.exports = require('bookshelf')(pg);
