const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

const indonesiaController = require('../controllers/indonesia.controller');
const provController = require('../controllers/province.controller');
const regController = require('../controllers/regency.controller');
const disController = require('../controllers/district.controller');
const vilController = require('../controllers/village.controller');

// router.get('/', deliveryOrderController.getall);
router.get('/provinces', VerifyToken, indonesiaController.getProvinces);
router.post('/provinces', VerifyToken, indonesiaController.getProvincesById);
router.post('/regencies', VerifyToken, indonesiaController.getRegenciesById);
router.post('/districts', VerifyToken, indonesiaController.getDistrictsById);
router.post('/villages', VerifyToken, indonesiaController.getVillagesById);
router.get('/change', VerifyToken, indonesiaController.changeDataLonglat);
router.get('/idn_provinces', VerifyToken, provController.get);
router.get('/idn_regencies', VerifyToken, regController.get);
router.get('/idn_regencies/:id', VerifyToken, regController.getById);
router.get('/idn_districts', VerifyToken, disController.get);
router.get('/idn_districts/:id', VerifyToken, disController.getById);
router.get('/idn_village', VerifyToken, vilController.get);
router.get('/idn_village/:id', VerifyToken, vilController.getById);
module.exports = router;
