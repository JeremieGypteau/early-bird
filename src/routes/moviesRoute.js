var express = require('express');
var moviesController = require('../controllers/moviesController');
var router = express.Router();

router.get('/movies', moviesController.get);

router.get('/movies/best', moviesController.best);

router.post('/movies/:id/rate', moviesController.rate);

module.exports = router;