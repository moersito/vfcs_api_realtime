const feedStockModel = require('../models/feedstock_type.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  feedStockModel.create(req.body, (err, doc) => {
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
      doc: [doc],
    });
  });
};

exports.get = (req, res) => {
  feedStockModel.find({}, (err, doc) => {
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
      docs: doc,
    });
  }).populate('createdBy');
};

exports.getById = (req, res) => {
  feedStockModel.findOne({ _id: req.params.id }, (err, doc) => {
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
      docs: doc,
    });
  });
};

exports.update = async (req, res) => {
  feedStockModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
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
      doc: [doc],
    });
  });
};

exports.delete = async (req, res) => {
  feedStockModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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
      doc: [],
    });
  });
};
