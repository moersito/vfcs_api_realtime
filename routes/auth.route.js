const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const AuthController = require('../controllers/auth.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/userlogin', VerifyToken, AuthController.userlogin);
module.exports = router;
