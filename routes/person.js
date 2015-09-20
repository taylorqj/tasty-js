var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('../modules/crypto');

// get all users
router.get('/', function (req, res, next) {
    models.Person
        .forge()
        .fetchAll()
        .then(function (people) {
            people.forEach(function (person) {
                // todo: move sanitize
                delete person.attributes.password;
                delete person.attributes.salt;
            });

            res.json(people);
        })
        .catch(next);
});

// get user by id
router.get('/:id', function (req, res, next) {
    req.checkParams('id').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return next(errors);
    }

    models.Person
        .where({
            id: req.params.id
        })
        .fetch()
        .then(function (person) {
            // todo: move sanitize
            delete person.attributes.password;
            delete person.attributes.salt;

            res.json(person);
        })
        .catch(next);
});

module.exports = router;
