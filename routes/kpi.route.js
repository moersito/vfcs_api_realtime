const express = require('express');
var VerifyToken = require('./VerifyToken');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const KPIController = require('../controllers/kpi.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/l1', VerifyToken, KPIController.totalL1);
router.post('/rm', VerifyToken, KPIController.totalRM);
router.post('/prod', VerifyToken, KPIController.totalProd);
router.post('/balpres', VerifyToken, KPIController.totalBalPres);
router.post('/do', VerifyToken, KPIController.totalDO);

router.post('/l2/totalall/downline', VerifyToken, KPIController.getTotalAllDownlinebyL2);
router.post('/l2/totalall/rm', VerifyToken, KPIController.getTotalAllRMbyL2);
router.post('/l2/totalall/prod', VerifyToken, KPIController.getTotalAllProdbyL2);
router.post('/l2/totalall/balpres', VerifyToken, KPIController.getTotalAllBalpresbyL2);
router.post('/l2/totalall/do', VerifyToken, KPIController.getTotalAllDObyL2);

router.post('/l2/total/downline', VerifyToken, KPIController.getTotalDownlinebyL2);
router.post('/l2/total/rm', VerifyToken, KPIController.getTotalRMbyL2);
router.post('/l2/total/prod', VerifyToken, KPIController.getTotalProdbyL2);
router.post('/l2/total/balpres', VerifyToken, KPIController.getTotalBalpresbyL2);
router.post('/l2/total/do', VerifyToken, KPIController.getTotalDObyL2);


router.post('/l2/dataall/downline', VerifyToken, KPIController.getDataAllDownlinebyL2);
router.post('/l2/dataall/rm', VerifyToken, KPIController.getDataAllRMbyL2);
router.post('/l2/dataall/cart', VerifyToken, KPIController.getDataAllCartbyL2);
router.post('/l2/dataall/prod', VerifyToken, KPIController.getDataAllProdbyL2);
router.post('/l2/dataall/balpres', VerifyToken, KPIController.getDataAllBalpresbyL2);
router.post('/l2/dataall/do', VerifyToken, KPIController.getDataAllDObyL2);


router.post('/l2/data/downline', VerifyToken, KPIController.getDataDownlinebyL2);
router.post('/l2/data/rm', VerifyToken, KPIController.getDataRMbyL2);
router.post('/l2/data/cart', VerifyToken, KPIController.getDataCartbyL2);
router.post('/l2/data/prod', VerifyToken, KPIController.getDataProdbyL2);
router.post('/l2/data/balpres', VerifyToken, KPIController.getDataBalpresbyL2);
router.post('/l2/data/do', VerifyToken, KPIController.getDataDObyL2);

// router.post('/l2/chart/downline', VerifyToken, KPIController.getChartDownlinebyL2);
// router.post('/l2/chart/rm', VerifyToken, KPIController.getChartRMbyL2);
// router.post('/l2/chart/cart', VerifyToken, KPIController.getChartCartbyL2);
// router.post('/l2/chart/prod', VerifyToken, KPIController.getChartProdbyL2);
router.post('/l2/chart/balpres', VerifyToken, KPIController.getChartBalpresbyL2);
// router.post('/l2/chart/do', VerifyToken, KPIController.getChartDObyL2);
module.exports = router;
