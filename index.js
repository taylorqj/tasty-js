var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('config');
var app = express();
var router = express.Router();
var port = config.get('application.port');

// use parser to add ability for POST data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// validator
app.use(expressValidator());

// wire up the routes
require('./routes')(app);

// error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        stack: err.stack
    });
});

// start her up
app.listen(port);

console.log('Tasty is alive on ' + port);
