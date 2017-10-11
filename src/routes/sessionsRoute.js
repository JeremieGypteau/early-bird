var express = require('express');
var sessionsController = require('../controllers/sessionsController');
var router = express.Router();

router.post('/sign-up', sessionsController.signUp);

router.post('/sign-in', sessionsController.signIn);

router.delete('/sign-out', sessionsController.signOut);

module.exports = router;