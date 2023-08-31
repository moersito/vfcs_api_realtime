const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const productionOrderController = require('../controllers/production_order_cart.controller');

router.get('/', VerifyToken, productionOrderController.get);
router.post('/', VerifyToken, productionOrderController.create);
router.get('/transaction/:id', VerifyToken, productionOrderController.getTransactionById);
// router.put('/:id', VerifyToken, productionOrderController.update);
router.delete('/:id', VerifyToken, productionOrderController.deleteById);
module.exports = router;
