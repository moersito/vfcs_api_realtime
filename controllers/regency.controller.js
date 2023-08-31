const regencyModel = require('../models/regency.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  regencyModel.create(req.body, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        regencies: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      regencies: [doc],
    });
  });
};

exports.get = (req, res) => {
  regencyModel.aggregate([{
    $lookup: {
      from: 'provinces', localField: 'province_id', foreignField: 'id', as: 'province',
    },
  }], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        value: req.params.id,
        regencies: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      value: req.params.id,
      regencies: doc,
    });
  });
};

exports.getById = (req, res) => {
  regencyModel.aggregate([{
    $lookup: {
      from: 'provinces', localField: 'province_id', foreignField: 'id', as: 'province',
    },
  }, {
    $match: {
      province_id: req.params.id,
    },
  },
  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        regencies: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      regencies: doc,
    });
  });
};

exports.update = async (req, res) => {
  regencyModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        regencies: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      regencies: [doc],
    });
  });
};

exports.delete = async (req, res) => {
  regencyModel.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        regencies: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      regencies: doc,
    });
  });
};
