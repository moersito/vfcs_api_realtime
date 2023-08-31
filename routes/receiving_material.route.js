const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const multer = require('multer');
// untuk menambahkan path
const path = require('path');

const receivingMaterialController = require('../controllers/receiving_material.controller');

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

router.get('/', VerifyToken, receivingMaterialController.get);
router.get('/status/:status/:id', VerifyToken, receivingMaterialController.getStatusReceiving);
router.get('/status/:status', VerifyToken, receivingMaterialController.getStatusReceivingNoUser);
router.get('/completed', VerifyToken, receivingMaterialController.getReceivingMaterialCompleted);
router.get('/completed/:id', VerifyToken, receivingMaterialController.getRecMaterialCompletedByID);
router.get('/draft', VerifyToken, receivingMaterialController.getReceivingMaterialDraft);
router.get('/weight', VerifyToken, receivingMaterialController.getReceivingMaterialWeight);
router.get('/weight/user/:id', VerifyToken, receivingMaterialController.getReceivingMaterialWeightByUser);
router.get('/balesCompleted', VerifyToken, receivingMaterialController.getReceivingBalesCompleted);
router.get('/balesCompleted/:id', VerifyToken, receivingMaterialController.getRecBalesCompletedByIdUser);
router.post('/', VerifyToken, receivingMaterialController.create);
router.post('/dateRange', VerifyToken, receivingMaterialController.getByDateRange);
router.post('/dateRange/User', VerifyToken, receivingMaterialController.getByDateRangeUser);
router.get('/:id', VerifyToken, receivingMaterialController.getById);
// router.get('/total', VerifyToken, receivingMaterialController.totalTonase);
router.post('/update', VerifyToken, multer({ storage: diskStorage }).fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), receivingMaterialController.updateById);
router.post('/updateStatus', VerifyToken, receivingMaterialController.updateStatusById);
router.delete('/:id', VerifyToken, receivingMaterialController.deleteById);
module.exports = router;
