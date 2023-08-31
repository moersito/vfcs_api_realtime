const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const jobController = require('../controllers/job.controller');



router.get('/', VerifyToken, jobController.get);
router.post('/', VerifyToken, jobController.create);
router.get('/:id', VerifyToken, jobController.getById);
router.put('/:id', VerifyToken, jobController.update);
router.delete('/:id', VerifyToken, jobController.delete);
module.exports = router;
