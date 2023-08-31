const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const roleUserController = require('../controllers/role_user.controller');

router.get('/', VerifyToken, roleUserController.get);
router.post('/', VerifyToken, roleUserController.create);
router.get('/:id', VerifyToken, roleUserController.getById);
router.put('/:id', VerifyToken, roleUserController.update);
router.delete('/:id', VerifyToken, roleUserController.delete);
module.exports = router;
