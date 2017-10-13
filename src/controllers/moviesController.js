// Models
var movieModel = require('../models/movieModel');
// Helper
var toolHelper = require('../helpers/toolsHelper');

exports.get = function(req, res){
    movieModel.get(res, (err, result) => {
        var movies = result.results;
        res.respond(movies, 200);
    });
};

exports.best = function(req, res){
    movieModel.get(res, (err, result) => {
        let movies = result.results;
        movies = toolHelper.sortBy(movies, 'vote_average');
        movies = movies.reverse();
        movies = movies.splice(0, 5);
        res.respond(movies, 200);
    });
};

exports.rate = function(req, res){
    if ((r = toolHelper.checkBody(req.body, 'rate')) != true)
        return res.respond(r, 400);
    if (!toolHelper.isValidNumber(req.body.rate))
        return res.respond('Incorrect format', 400);
    if (req.body.rate <= 0 || req.body.rate > 10)
        return res.respond('Your rating should be between 1 and 10', 400);
    movieModel.get(res, (err, result) => {
        let movies =  result.results;
        if (toolHelper.filter(movies, 'id', req.params.id).length == 0)
            return res.respond('This movie does not exist', 404);
        movieModel.rate(res, req.session.email, req.params.id, req.body.rate, (err, result) => {
            res.respond(204);
        });
    });
};