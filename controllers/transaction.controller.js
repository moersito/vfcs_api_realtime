const receivingModel = require('../models/receiving_material.model');
const pordOrderModel = require('../models/production_order.model');
const balesPressModel = require('../models/bales_pressing.model');
const deliveryOrderModel = require('../models/delivery_order.model');
const salesOrderModel = require('../models/sales_order.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  // RM
  if (req.body.code.includes(`${strings.code.Receiving}`)) {
    receivingModel.findOne({ code: req.body.code }, (err, doc) => {
      if (err) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
      });
    }).populate('createdUser');
  }
  // Production
  if (req.body.code.includes(`${strings.code.ProdOrder}`)) {
    pordOrderModel.findOne({ code: req.body.code }, (err, doc) => {
      if (err) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
      });
    }).populate('createdBy');
  }
  // Bales
  if (req.body.code.includes(`${strings.code.BalesPress}`)) {
    balesPressModel.findOne({ code: req.body.code }, (err, doc) => {
      if (err) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
      });
    }).populate('createdBy');
  }
  // DeliveryOrder
  if (req.body.code.includes(`${strings.code.DeliveryOrder}`)) {
    deliveryOrderModel.findOne({ code: req.body.code }, (err, doc) => {
      if (err) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
      });
    }).populate('createdBy');
  }
  // SalesOrder
  if (req.body.code.includes(`${strings.code.SalesOrder}`)) {
    salesOrderModel.findOne({ code: req.body.code }, (err, doc) => {
      if (err) {
        return res.send({
          status: '200',
          error: true,
          msg: strings.response.failed_created,
          docs: [],
        });
      }
      return res.send({
        status: '200',
        error: false,
        msg: strings.response.success_created,
        docs: [doc],
      });
    }).populate('createdUser');
  }
};
