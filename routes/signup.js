var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('../modules/crypto');
var uuid = require('uuid');

router.post('/', function (req, res, next) {
    req.checkBody('firstName').notEmpty();
    req.checkBody('lastName').notEmpty();
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
            if (person) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            crypto.hashPassword(req.body.password, function (err, result) {
                if (err) {
                    return next(err);
                }

                models.Person
                    .forge({
                        id: uuid.v4(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: result.hash,
                        salt: result.salt
                    })
                    .save(null, {
                        method: 'insert'
                    })
                    .then(function (result) {
                        // todo: move sanitize
                        delete result.attributes.password;
                        delete result.attributes.salt;

                        res.json(result);
                    })
                    .catch(next);
            });
        });
});

module.exports = router;
