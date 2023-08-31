const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const DashboardController = require('../controllers/dashboard.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/total/rm', VerifyToken, DashboardController.totalRM);
router.get('/total/rm/:id', VerifyToken, DashboardController.totalRMById);
router.get('/total/prod', VerifyToken, DashboardController.totalProd);
router.get('/total/prod/:id', VerifyToken, DashboardController.totalProdById);
router.get('/total/balpres', VerifyToken, DashboardController.totalBalPres);
router.get('/total/balpres/:id', VerifyToken, DashboardController.totalBalPresById);
router.get('/total/do', VerifyToken, DashboardController.totalDO);
router.get('/total/do/:id', VerifyToken, DashboardController.totalDOById);
router.post('/chart/rm', VerifyToken, DashboardController.chartRM);
router.post('/chart/prod', VerifyToken, DashboardController.chartProd);
router.post('/chart/balpres', VerifyToken, DashboardController.chartBalPres);
router.post('/chart/do', VerifyToken, DashboardController.chartDO);
module.exports = router;
