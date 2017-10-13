var express = require('express');
var favouritesController = require('../controllers/favouritesController');
var router = express.Router();

router.post('/favourites/movies/:id', favouritesController.add);

module.exports = router;