var bookshelf = require('../modules/bookshelf');
var _ = require('underscore');
var str = require('underscore.string');

var Follower = bookshelf.Model.extend({
    tableName: 'follower',

    // convert snake_case to camelCase
    parse: function(attrs) {
        return _.reduce(attrs, function(memo, val, key) {
            memo[str.camelize(key)] = val;
            return memo;
        }, {});
    },

    // convert camelCase to snake_case
    format: function(attrs) {
        return _.reduce(attrs, function(memo, val, key) {
            memo[str.underscored(key)] = val;
            return memo;
        }, {});
    }
});

module.exports = Follower;
