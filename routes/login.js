var express = require('express');
var router = express.Router();
var crypto = require('../modules/crypto');
var jwt = require('jsonwebtoken');
var config = require('config');
var models = require('../models');

router.post('/', function (req, res, next) {
    req.checkBody('email').isEmail();
    req.checkBody('password').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return next(errors);
    }

    models.Person
        .where({
            email: req.body.email
        })
        .fetch()
        .then(function (person) {
            if (!person) {
                return res.status(401).json({
                    message: 'Invalid username or password.'
                });
            }

            crypto.validatePassword(req.body.password, person.attributes.password, person.attributes.salt, function (err, result) {
                if (err) {
                    return next(err);
                }

                if (!result) {
                    return res.status(401).json({
                        message: 'Invalid username or password.'
                    });
                }

                // todo (tqj): move to sanitize
                delete person.attributes.password;
                delete person.attributes.salt;

                var token = jwt.sign(person.attributes, config.auth.secret, {
                    issuer: config.auth.issuer,
                    audience: config.auth.audience,
                    expiresInMinutes: 120
                });

                res.json({
                    token: token
                });
            });
        })
        .catch(next);
});

module.exports = router;
