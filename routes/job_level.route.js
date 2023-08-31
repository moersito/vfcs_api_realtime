const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const job_levelController = require('../controllers/job_level.controller');

router.get('/', VerifyToken, job_levelController.get);
router.post('/', VerifyToken, job_levelController.create);
router.get('/:id', VerifyToken, job_levelController.getById);
router.put('/:id', VerifyToken, job_levelController.update);
router.delete('/:id', VerifyToken, job_levelController.delete);
module.exports = router;
