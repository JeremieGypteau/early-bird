var express = require('express');
var usersController = require('../controllers/usersController');
var router = express.Router();

router.get('/users/:email/favourites', usersController.userFavourite);

module.exports = router;