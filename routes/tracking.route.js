const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const trackingController = require('../controllers/tracking.controller');

router.get('/:id', VerifyToken, trackingController.get);
router.get('/bales/:id', VerifyToken, trackingController.getBales);
module.exports = router;
