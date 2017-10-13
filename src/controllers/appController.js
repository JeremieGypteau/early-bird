// Libs
var _ = require('underscore');
// Models
var sessionModel = require('../models/sessionModel');

const NON_SECURE_PATHS = ['/api/sign-in', '/api/sign-up'];


exports.checkApiToken = function (req, res, next) {
    var nonSecure = _.filter(NON_SECURE_PATHS, (path) => {
        return req.path.match(path);
    });
    if (nonSecure.length || req.path.indexOf('/api/') == -1)
        return next();
    else if (typeof req.headers.authorization == 'undefined')
        res.respond("An authentication is required", 401);
    else if (typeof req.session.email == 'undefined')
        res.respond("An authentication is required", 401);
    else{
        sessionModel.isValid(res, req.session.email, req.headers.authorization,
            (valid) => {
                if (valid !== false)
                    return next();
                return res.respond("Your authentication has expired.", 419);
            }
        );
    }
}
