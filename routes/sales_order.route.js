const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const SalesOrderController = require('../controllers/sales_order.controller');

router.get('/', VerifyToken, SalesOrderController.get);
router.post('/', VerifyToken, SalesOrderController.create);
router.get('/:id', VerifyToken, SalesOrderController.getById);
router.put('/:id', VerifyToken, SalesOrderController.update);
router.delete('/:id', VerifyToken, SalesOrderController.delete);
router.get('/dashboard/weight', VerifyToken, SalesOrderController.getTotalWeight);
router.get('/dashboard/transaction', VerifyToken, SalesOrderController.getTotalTransaction);
module.exports = router;
