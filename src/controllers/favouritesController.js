// Models
var movieModel = require('../models/movieModel');
var favouriteModel = require('../models/favouriteModel');
// Helper
var toolHelper = require('../helpers/toolsHelper');


exports.add = function(req, res){
    movieModel.get(res, (err, result) => {
        let movies = toolHelper.filter(result.results, 'id', req.params.id);
        if (movies.length == 0)
            return res.respond('This movie does not exist', 404);
        movies[0].email = req.session.email;
        favouriteModel.add(res, movies[0], (err, result) => {
            return res.respond(movies[0], 200);
        });
    });
};