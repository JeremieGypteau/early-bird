
exports.isValid = function(res, email, token, callback) {
    db.collection("sessions").findOne({email: email, token: token}, (error, result) => {
        if (error) res.respond(500);
        else if (callback != null) {
            if (result == null)
                return callback(false);
            return callback(result);
        }
    });
};

exports.add = function(res, email, token, callback){
    db.collection("sessions").insertOne({email: email, token: token}, null, (err, result) => {
        if (err) res.respond(500);
        else if (callback != null)
            return callback(result);
    });
};

exports.delete = function(res, email, token, callback){
    db.collection("sessions").removeOne({email: email, token: token}, null, (err, result) => {
        if (err) res.respond(500);
        else if (callback != null)
            return callback(result);
    });
};