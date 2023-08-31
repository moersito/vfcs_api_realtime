const mongoose = require('mongoose');
const balesPressingModel = require('../models/bales_pressing.model');
const productionOrderModel = require('../models/production_order.model');
const masterGoodsModel = require('../models/master_goods_cart.model');
const deliveryOrderModel = require('../models/delivery_order.model');
const strings = require('../utils/strings');

exports.totalRM = async (req, res) => {
  masterGoodsModel.aggregate(
    [
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

exports.totalRMById = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $match: { createdUser: mongoose.Types.ObjectId(req.params.id) },
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

exports.totalProd = async (req, res) => {
  productionOrderModel.aggregate(
    [
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

exports.totalProdById = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: { createdBy: mongoose.Types.ObjectId(req.params.id) },
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

exports.totalBalPres = async (req, res) => {
  balesPressingModel.aggregate(
    [
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

exports.totalBalPresById = async (req, res) => {
  balesPressingModel.aggregate(
    [
      {
        $match: { createdBy: mongoose.Types.ObjectId(req.params.id) },
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

exports.totalDO = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
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

exports.totalDOById = async (req, res) => {
  deliveryOrderModel.aggregate(
    [
      {
        $match: { createdBy: mongoose.Types.ObjectId(req.params.id) },
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

exports.chartRM = async (req, res) => {
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
          _id: {
            day: { $dayOfMonth: '$createdDate' }, month: { $month: '$createdDate' }, year: { $year: '$createdDate' }, date: { $dateToString: { format: '%d-%m-%Y', date: '$createdDate' } },
          },

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
        doc: user,
      });
    },
  );
};

exports.chartProd = async (req, res) => {
  productionOrderModel.aggregate(
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
          _id: {
            day: { $dayOfMonth: '$createdDate' }, month: { $month: '$createdDate' }, year: { $year: '$createdDate' }, date: { $dateToString: { format: '%d-%m-%Y', date: '$createdDate' } },
          },

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
        doc: user,
      });
    },
  );
};

exports.chartBalPres = async (req, res) => {
  balesPressingModel.aggregate(
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
          _id: {
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

exports.chartDO = async (req, res) => {
  deliveryOrderModel.aggregate(
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
          _id: {
            day: { $dayOfMonth: '$createdDate' }, month: { $month: '$createdDate' }, year: { $year: '$createdDate' }, date: { $dateToString: { format: '%d-%m-%Y', date: '$createdDate' } },
          },

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
