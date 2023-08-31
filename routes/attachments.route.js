const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const AttachmentsController = require('../controllers/attachments.controller');

// a simple test url to check that all of our files are communicating correctly.
// router.get('/', receivingMaterialController.products);
router.post('/create', VerifyToken, AttachmentsController.attachment_create);
// router.get('/:id', receivingMaterialController.product_details);
// router.put('/:id/update', receivingMaterialController.product_update);
// router.delete('/:id/delete', receivingMaterialController.product_delete);
module.exports = router;
