
exports.isExist = function(res, email, callback){
    db.collection("users").findOne({email: email}, (error, result) => {
        if (error) res.respond(500);
        else if (callback != null) {
            if (result == null)
                return callback(false);
            return callback(result);
        }
    });
};

exports.add = function(res, email, firstname, lastname, callback){
    db.collection("users").insertOne({email: email, firstname: firstname, lastname: lastname}, null, (err, result) => {
        if (err) res.respond(500);
        else if (callback != null) {
            return callback(result);
        }
    });
};