var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  models.User
    .forge()
    .fetchAll()
    .then(function(user) {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
