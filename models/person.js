var bookshelf = require('../modules/bookshelf');
var _ = require('underscore');
var str = require('underscore.string');

// get our reference to bridge table
var FollowerUser = require("./follower");

var Person = bookshelf.Model.extend({
    tableName: 'person',

    followers: function () {
        return this.hasMany(FollowerUser, 'follower');
    },

    following: function () {
        return this.hasMany(FollowerUser, 'followee');
    },

    // convert snake_case to camelCase
    parse: function (attrs) {
        return _.reduce(attrs, function (memo, val, key) {
            memo[str.camelize(key)] = val;
            return memo;
        }, {});
    },

    // convert camelCase to snake_case
    format: function (attrs) {
        return _.reduce(attrs, function (memo, val, key) {
            memo[str.underscored(key)] = val;
            return memo;
        }, {});
    }
});

module.exports = Person;
