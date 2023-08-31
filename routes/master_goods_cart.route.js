const express = require('express');
var VerifyToken = require('./VerifyToken');

const routeMasterGoodsCart = express.Router();

const multer = require('multer');
// untuk menambahkan path
const path = require('path');

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

const masterGoodsCartController = require('../controllers/master_goods_cart.controller');

routeMasterGoodsCart.get('/', VerifyToken, masterGoodsCartController.get);
routeMasterGoodsCart.post('/', VerifyToken, multer({ storage: diskStorage }).fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }]), masterGoodsCartController.create);
routeMasterGoodsCart.get('/:id', VerifyToken, masterGoodsCartController.getById);
routeMasterGoodsCart.get('/transaction/:id', VerifyToken, masterGoodsCartController.getByIdTransaction);
routeMasterGoodsCart.get('/dashboard/tonase', VerifyToken, masterGoodsCartController.getSumTonase);
routeMasterGoodsCart.get('/dashboard/tonase/:id', VerifyToken, masterGoodsCartController.getSumTonaseById);
routeMasterGoodsCart.get('/dashboard/downline', VerifyToken, masterGoodsCartController.totalDownlineRec);
routeMasterGoodsCart.get('/dashboard/downline/:id/:status', VerifyToken, masterGoodsCartController.totalDownlineRecById);
routeMasterGoodsCart.delete('/:id', VerifyToken, masterGoodsCartController.deleteById);
routeMasterGoodsCart.delete('/transaction/:id', VerifyToken, masterGoodsCartController.deleteByTransaction);
routeMasterGoodsCart.post('/updatebatch', VerifyToken, masterGoodsCartController.updateBatch);
routeMasterGoodsCart.get('/data/range/groupuser', VerifyToken, masterGoodsCartController.getRangeGroupUser);
module.exports = routeMasterGoodsCart;
