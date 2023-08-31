const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const deliveryOrderController = require('../controllers/delivery_order.controller');

router.get('/', VerifyToken, deliveryOrderController.getall);
router.get('/user/:id', VerifyToken, deliveryOrderController.getByUserId);
router.post('/', VerifyToken, deliveryOrderController.create);
router.get('/:id', VerifyToken, deliveryOrderController.details);
router.post('/dateRange/User', VerifyToken, deliveryOrderController.getByDateRangeUser);
router.get('/dashboard/transaction', VerifyToken, deliveryOrderController.getTotalTransaction);
router.get('/dashboard/transaction/:id', VerifyToken, deliveryOrderController.getTotalTransaction);
router.get('/code/:id', VerifyToken, deliveryOrderController.detailsByDO);
router.delete('/:id', VerifyToken, deliveryOrderController.deleteById);
// router.put('/:id', deliveryOrderController.update);
module.exports = router;
