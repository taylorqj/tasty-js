var bookshelf = require('../modules/bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'user'
});

module.exports = User;
