// Lib
var crypto = require('crypto');

exports.generateApiToken = function(){
    token = crypto.randomBytes(32).toString('hex');
    return token;
};