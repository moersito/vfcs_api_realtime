const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const balesPressingController = require('../controllers/bales_pressing.controller');

router.get('/', VerifyToken, balesPressingController.getBales);
router.get('/user/:id', VerifyToken, balesPressingController.getBalesByStatusId);
router.get('/draft', VerifyToken, balesPressingController.getBalesDraft);
router.get('/draft/:id', VerifyToken, balesPressingController.getBalesDraftById);
router.post('/', VerifyToken, balesPressingController.create);
router.post('/status', VerifyToken, balesPressingController.updateStatusById);
router.get('/:id', VerifyToken, balesPressingController.details);
router.post('/dateRange/User', VerifyToken, balesPressingController.getByDateRangeUser);
router.get('/dashboard/weight', VerifyToken, balesPressingController.getTotalWeight);
router.get('/dashboard/weight/:id', VerifyToken, balesPressingController.getTotalWeightByUser);
router.get('/dashboard/transaction', VerifyToken, balesPressingController.getTotalTransaction);
router.get('/dashboard/transaction/:id', VerifyToken, balesPressingController.getTotalTransactionByUser);
router.delete('/:id', VerifyToken, balesPressingController.deleteById);
module.exports = router;
