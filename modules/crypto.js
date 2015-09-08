var crypto = require('crypto');
var LENGTH = 64;

/**
 * Crypto
 * @module crypto
 * @type {{generateSalt: Function, generateHash: Function, hashPassword: Function, validatePassword: Function}}
 */
module.exports = {
    /**
     * Generates a random salt as cleaned base64
     * @param callback
     */
    generateSalt: function(callback) {
        crypto.randomBytes(Math.ceil(LENGTH * 3 / 4), function(err, buf) {
            callback(err, cleanup(buf));
        });
    },

    /**
     * Generates a hash from a password using a salt
     * @param password
     * @param salt
     * @param callback
     */
    generateHash: function(password, salt, callback) {
        crypto.pbkdf2(password, salt, 10000, LENGTH, function(err, buf) {
            callback(err, cleanup(buf));
        });
    },

    /**
     * Combined function to create a salt, and hash the passed in password
     * @param password
     * @param callback
     */
    hashPassword: function(password, callback) {
        var self = this;

        this.generateSalt(function(err, salt) {
            self.generateHash(password, salt, function(err, hash) {
                callback(err, {
                    salt: salt,
                    hash: hash
                });
            });
        });
    },

    /**
     * Validates a password is equal to a hash with salt
     * @param password
     * @param hash
     * @param salt
     * @param callback
     */
    validatePassword: function(password, hash, salt, callback) {
        this.generateHash(password, salt, function(err, newHash) {
            callback(err, newHash === hash);
        });
    }
};

function cleanup(buf) {
    return buf
        .toString('base64') // convert to base64 format
        .slice(0, LENGTH) // return required number of characters
        .replace(/\+/g, '_') // replace '+' with '0'
        .replace(/\//g, '|'); // replace '/' with '0');
}
