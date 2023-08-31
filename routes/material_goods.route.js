const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const materialGoodsController = require('../controllers/material_goods.controller');

router.get('/', VerifyToken, materialGoodsController.get);
router.post('/', VerifyToken, materialGoodsController.create);
router.get('/:id', VerifyToken, materialGoodsController.getById);
router.put('/:id', VerifyToken, materialGoodsController.update);
router.delete('/:id', VerifyToken, materialGoodsController.delete);
module.exports = router;
