const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const uomController = require('../controllers/uom.controller');

router.get('/', VerifyToken, uomController.get);
router.post('/', VerifyToken, uomController.create);
router.get('/:id', VerifyToken, uomController.getById);
router.put('/:id', VerifyToken, uomController.update);
router.delete('/:id', VerifyToken, uomController.delete);
module.exports = router;
