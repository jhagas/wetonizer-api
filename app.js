var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/javanese');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/', users);

module.exports = app;
