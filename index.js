var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var app = express();
var router = express.Router();
var port = config.get('application.port');

// use parser to add ability for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// wire up the routes
app.use('api', router);

// start her up
app.listen(port);

console.log('Tasty is alive on ' + port);
