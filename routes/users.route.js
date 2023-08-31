const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!

const multer = require('multer');
// untuk menambahkan path
const path = require('path');
const UsersController = require('../controllers/users.controller');

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

// a simple test url to check that all of our files are communicating correctly.
router.get('/', VerifyToken, UsersController.users);
router.post('/', VerifyToken, multer({ storage: diskStorage }).fields([{ name: 'owner', maxCount: 1 }, { name: 'location', maxCount: 1 }, { name: 'member', maxCount: 1 }, { name: 'ktp', maxCount: 1 }, { name: 'sign', maxCount: 1 }]), UsersController.user_create);
router.post('/login', UsersController.loginEmailPassword);
router.get('/dashboard/l0', VerifyToken, UsersController.totalL0);
router.get('/dashboard/l1', VerifyToken, UsersController.totalL1);
router.get('/dashboard/l1/:id', VerifyToken, UsersController.totalL1ByUser);
router.get('/dashboard/l2', VerifyToken, UsersController.totalL2);
router.get('/dashboard/buyer', VerifyToken, UsersController.totalBuyer);
router.get('/dashboard/buyer/:id', VerifyToken, UsersController.totalBuyerByUser);
router.get('/data/l2', VerifyToken, UsersController.getUserL2);
router.get('/data/l1_l2', VerifyToken, UsersController.getUserL1L2);
router.get('/data/recycler', VerifyToken, UsersController.getUserRecycler);
router.post('/data/downline/', VerifyToken, UsersController.getDownlineL2);
router.get('/data/downlinebyl2/:id', VerifyToken, UsersController.getDownlinebyL2);
router.get('/data/buyer', VerifyToken, UsersController.getUserBuyer);
router.get('/data/buyer/:id', VerifyToken, UsersController.getUserBuyerById);
router.get('/data/supplier', VerifyToken, UsersController.getUserL1);
router.get('/data/supplier/:id', VerifyToken, UsersController.getUserL1ById);
router.get('/:id', VerifyToken, UsersController.user_details);
router.put('/:id', VerifyToken, multer({ storage: diskStorage }).fields([{ name: 'owner', maxCount: 1 }, { name: 'location', maxCount: 1 }, { name: 'member', maxCount: 1 }, { name: 'ktp', maxCount: 1 }, { name: 'sign', maxCount: 1 }]), UsersController.user_update);
router.put('/password/:id', VerifyToken, UsersController.usersChangePassword);
router.put('/password_email/:id', VerifyToken, UsersController.usersChangePasswordEmail);
router.delete('/:id', VerifyToken, UsersController.user_delete);
router.get('/data/range/groupregency', VerifyToken, UsersController.getGroupRegency);
module.exports = router;
