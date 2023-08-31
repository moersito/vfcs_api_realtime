const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const generateNumberController = require('../controllers/generate_number.controller');

// router.get('/', deliveryOrderController.getall);
router.post('/', VerifyToken, generateNumberController.createGenerateNumber);
// router.get('/:id', deliveryOrderController.details);
// router.put('/:id', deliveryOrderController.update);
// router.delete('/:id', deliveryOrderController.delete);
module.exports = router;
