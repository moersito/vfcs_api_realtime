const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const PurchaseOrderController = require('../controllers/purchase_order.controller');

router.get('/', VerifyToken, PurchaseOrderController.get);
router.post('/', VerifyToken, PurchaseOrderController.create);
router.get('/:id', VerifyToken, PurchaseOrderController.getById);
router.get('/recycler/:id', VerifyToken, PurchaseOrderController.getPurchaseRecycler);
router.put('/:id', VerifyToken, PurchaseOrderController.update);
router.delete('/:id', VerifyToken, PurchaseOrderController.delete);
module.exports = router;
