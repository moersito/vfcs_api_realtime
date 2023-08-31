const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const departmentController = require('../controllers/department.controller');

router.get('/', VerifyToken, departmentController.get);
router.post('/', VerifyToken, departmentController.create);
router.get('/:id', VerifyToken, departmentController.getById);
router.put('/:id', VerifyToken, departmentController.update);
router.delete('/:id', VerifyToken, departmentController.delete);
module.exports = router;
