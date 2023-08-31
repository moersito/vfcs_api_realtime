const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const feedStockController = require('../controllers/feedstock_type.controller');

router.get('/', VerifyToken, feedStockController.get);
router.post('/', VerifyToken, feedStockController.create);
router.get('/:id', VerifyToken, feedStockController.getById);
router.put('/:id', VerifyToken, feedStockController.update);
router.delete('/:id', VerifyToken, feedStockController.delete);
module.exports = router;
