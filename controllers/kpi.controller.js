const mongoose = require('mongoose');
const balesPressingModel = require('../models/bales_pressing.model');
const usersModel = require('../models/users.model');
const productionOrderModel = require('../models/production_order.model');
const masterGoodsModel = require('../models/master_goods_cart.model');
const receivingMaterialModel = require('../models/receiving_material.model');
const deliveryOrderModel = require('../models/delivery_order.model');
const strings = require('../utils/strings');

exports.totalL1 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          created_date: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          role_user_id: '3',
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: user,
      });
    },
  );
};

exports.totalRM = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$tonase' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: user,
      });
    },
  );
};

exports.totalProd = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) },
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$qty' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: user,
      });
    },
  );
};

exports.totalBalPres = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {
          createdDate: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) },
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$weight' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: user,
      });
    },
  );
};

exports.totalDO = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) },
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: user,
      });
    },
  );
};

exports.getTotalDownlinebyL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          created_date: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          created_by: req.body.id,
          role_user_id: '3',
        },
      },

      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: [],
      });
    },
  );
};

exports.getTotalRMbyL2 = async (req, res) => {
  masterGoodsModel.aggregate(
    [

      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$tonase' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalProdbyL2 = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$qty' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalBalpresbyL2 = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$weight' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalDObyL2 = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: user,
      });
    },
  );
};

exports.getTotalAllDownlinebyL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {

          created_by: req.body.id,
          role_user_id: '3',
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: [],
      });
    },
  );
};

exports.getTotalAllRMbyL2 = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $match: {

          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$tonase' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalAllProdbyL2 = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$qty' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalAllBalpresbyL2 = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          totalAmount: { $sum: '$weight' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: [],
      });
    },
  );
};

exports.getTotalAllDObyL2 = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        total: user.length === 0 ? 0 : user[0].count,
        doc: user,
      });
    },
  );
};

// data

exports.getDataAllDownlinebyL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {

          created_by: req.body.id,
          role_user_id: '3',
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataAllRMbyL2 = async (req, res) => {
  receivingMaterialModel.aggregate(
    [
      {
        $match: {

          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataAllCartbyL2 = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $match: {

          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataAllProdbyL2 = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataAllBalpresbyL2 = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataAllDObyL2 = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: {

          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};





exports.getDataDownlinebyL2 = async (req, res) => {
  usersModel.aggregate(
    [
      {
        $match: {
          created_date: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          created_by: req.body.id,
          role_user_id: '3',
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataRMbyL2 = async (req, res) => {
  receivingMaterialModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataCartbyL2 = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdUser: mongoose.Types.ObjectId(req.body.id),
        },
      },

    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataProdbyL2 = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataBalpresbyL2 = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getDataDObyL2 = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};

exports.getChartBalpresbyL2 = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $group:
        {
          _id: {type:'$typeGoods',
            day: { $dayOfMonth: '$createdDate' }, month: { $month: '$createdDate' }, year: { $year: '$createdDate' }, date: { $dateToString: { format: '%d-%m-%Y', date: '$createdDate' } },
          },

          totalAmount: { $sum: '$weight' },
          count: { $sum: 1 },
        },
      },
    ], (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          doc: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        doc: user,
      });
    },
  );
};
