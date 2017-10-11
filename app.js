require('./response');

/**
 * Module dependencies.
 */
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

/**
 * App initialisation
 */
app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:'scoring-advantage',
    resave : false,
    saveUninitialized: true,
    cookie: {}
}));


/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res) {
    res.respond(501);
});


/**
 * Development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production error handler
 * No stacktraces leaked to user
 */
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;