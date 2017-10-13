// Libs
var https = require('https');

exports.get = function(res, callback){
    https.get('https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe',
        (res) => {
            res.on('data', (d) => {
                callback(null, JSON.parse(d.toString()));
            });
        }
    ).on('error', (e) => {return res.respond(500);});
};

exports.rate = function(res, email, id, rate, callback){
    db.collection("rates").insertOne({email: email, id: id, rate: rate}, null, (err, result) => {
        if (err) res.respond(500);
        else if (callback != null) {
            return callback(result);
        }
    });
};