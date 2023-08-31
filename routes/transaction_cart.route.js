const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const transactionCartController = require('../controllers/transaction_cart.controller');

router.get('/', VerifyToken, transactionCartController.get);
router.post('/', VerifyToken, transactionCartController.create);
router.get('/:id', VerifyToken, transactionCartController.getById);
router.get('/transaction/:id', VerifyToken, transactionCartController.getByIdTransaction);
router.delete('/:id', VerifyToken, transactionCartController.deleteById);
module.exports = router;
