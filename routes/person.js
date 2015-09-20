var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('../modules/crypto');
var uuid = require('uuid');

/**
 * Get all users
 * @param  {callback} function (req, res, next) callback
 * @return {array}                              user objects
 */
router.get('/', function (req, res, next) {
    models.Person
        .forge()
        .fetchAll({
            withRelated: ['followers', 'following']
        })
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

/**
 * Get a user by id
 * @param  {uuid}     '/:id'                    uuid of user
 * @param  {callback} function (req, res, next) callback
 * @return {object}                             user object
 */
router.get('/:id', function (req, res, next) {
    req.checkParams('id').isUUID();

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

/**
 * Follow a user
 * @param  {string}   '/follow/:id'            route
 * @param  {callback} function(req, res, next) callback
 * @return {object}                            following object
 */
router.post('/follow/:id', function (req, res, next) {
    req.checkParams('id').isUUID();

    var errors = req.validationErrors();

    if (errors) {
        return next(errors);
    }

    // todo (tqj): check if user exists before following

    models.Follower
        .forge({
            id: uuid.v4(),
            followee: req.user.id,
            follower: req.params.id
        })
        .save(null, {
            method: 'insert'
        })
        .then(function (follower) {
            res.json(follower);
        })
        .catch(next);
});

module.exports = router;
