const provinceModel = require('../models/province.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  provinceModel.create(req.body, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        provinces: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      provinces: [doc],
    });
  });
};

exports.get = (req, res) => {
  provinceModel.find({}, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        provinces: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      provinces: doc,
    });
  });
};

exports.getById = (req, res) => {
  provinceModel.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        provinces: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      provinces: doc,
    });
  });
};


exports.update = async (req, res) => {
  provinceModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        provinces: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      provinces: [doc],
    });
  });
};

exports.delete = async (req, res) => {
  provinceModel.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        provinces: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      provinces: doc,
    });
  });
};