const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const productionOrderController = require('../controllers/production_order.controller');

router.get('/', VerifyToken, productionOrderController.get);
router.get('/user/:id', VerifyToken, productionOrderController.getByUser);
router.post('/', VerifyToken, productionOrderController.create);
router.post('/status', VerifyToken, productionOrderController.updateStatusById);
router.get('/draft', VerifyToken, productionOrderController.getProductionOrderDraft);
router.get('/completed', VerifyToken, productionOrderController.getProductionOrderCompleted);
router.get('/completed/user/:id', VerifyToken, productionOrderController.getProductionOrderCompletedByIdUser);
router.get('/:id', VerifyToken, productionOrderController.details);
router.post('/dateRange/User', VerifyToken, productionOrderController.getByDateRangeUser);
router.get('/dashboard/transaction', VerifyToken, productionOrderController.totalTransaction);
router.get('/dashboard/quantity', VerifyToken, productionOrderController.totalQty);
router.get('/dashboard/quantity/:id', VerifyToken, productionOrderController.totalQtyByUser);
router.get('/dashboard/transaction/:id', VerifyToken, productionOrderController.totalTransactionByUser);
router.delete('/:id', VerifyToken, productionOrderController.deleteById);
router.put('/transaction/:id', VerifyToken, productionOrderController.updateTransactionById);

// router.put('/:id', productionOrderController.update);
module.exports = router;
