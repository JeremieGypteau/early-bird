
exports.get = function(res, email, callback){
    db.collection('favourites').find({email: email}).toArray((err, result) => {
        if (err) res.respond(500);
        else if (callback != null) {
            return callback(err, result);
        }
    });
};

exports.add = function(res, movie, callback){
    db.collection("favourites").updateOne(movie, { $set: movie}, {upsert: true}, (err, result) => {
        if (err) res.respond(500);
        else if (callback != null) {
            return callback(err, result);
        }
    });
};