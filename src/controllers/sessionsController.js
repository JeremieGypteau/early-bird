// Models
var sessionModel = require('../models/sessionModel');
var userModel = require('../models/userModel');
// Helpers
var toolHelper = require('../helpers/toolsHelper');
var sessionHelper = require('../helpers/sessionHelper');

exports.signUp = function(req, res){
    if ((r = toolHelper.checkBody(req.body, 'email', 'firstname', 'lastname')) != true)
        return res.respond(r, 400);
    userModel.isExist(res, req.body.email, (userExist) => {
        if (userExist !== false)
            return res.respond("This account already exists", 409);
        userModel.add(res, req.body.email, req.body.firstname, req.body.lastname, (user) => {
            res.respond(user.ops[0], 201);
        });
    });
};

exports.signIn = function(req, res){
    if ((r = toolHelper.checkBody(req.body, 'email')) != true)
        return res.respond(r, 400);
    userModel.isExist(res, req.body.email, (user) => {
        if (user === false)
            return res.respond("This account doesn't exist", 404);
        user.token = sessionHelper.generateApiToken();
        sessionModel.add(res, user.email, user.token, (result) => {
            req.session.email = user.email;
            req.session.firstname = user.firstname;
            req.session.lastname = user.lastname;
            res.respond(user, 201);
        });
    });
};

exports.signOut = function(req, res){
    sessionModel.delete(res, req.session.email, req.headers.authorization, null);
    req.session.destroy();
    res.respond(200);
};