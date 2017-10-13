// Model
var favouriteModel = require('../models/favouriteModel');
// Helper
var toolHelper = require('../helpers/toolsHelper');

exports.userFavourite = function(req, res) {
    favouriteModel.get(res, req.params.email, (err, result) => {
        let favourites = toolHelper.deleteAttributeArray(result, result.length, 'email');
        res.respond(favourites, 200);
    });
};