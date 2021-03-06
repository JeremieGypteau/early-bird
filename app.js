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
var mongo = require('mongodb');
var appController = require('./src/controllers/appController');


/**
 * Database initialisation
 */
var serverInstance = new mongo.Server('localhost', 27017, {auto_reconnect: true});
db = new mongo.Db('early-bird', serverInstance);
db.open((err, dbref) => {
    if (err)
        console.log(err);
});

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
 * API routes
 */
app.use(appController.checkApiToken);
app.use('/api', require('./src/routes/sessionsRoute'));
app.use('/api', require('./src/routes/moviesRoute'));
app.use('/api', require('./src/routes/favouritesRoute'));
app.use('/api', require('./src/routes/usersRoute'));


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