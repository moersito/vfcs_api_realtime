const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const transactionController = require('../controllers/transaction.controller');

router.post('/', VerifyToken, transactionController.create);
module.exports = router;
