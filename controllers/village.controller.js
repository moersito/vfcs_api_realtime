const villageModel = require('../models/villages.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  villageModel.create(req.body, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        village: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      village: [doc],
    });
  });
};

exports.get = (req, res) => {
  villageModel.aggregate([{
    $lookup: {
      from: strings.District, localField: 'district_id', foreignField: 'id', as: 'district',
    },
  }], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        village: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      village: doc,
    });
  });
};

exports.getById = (req, res) => {
  villageModel.aggregate([{
    $lookup: {
      from: strings.District, localField: 'district_id', foreignField: 'id', as: 'district',
    },
  }, {
    $match: {
      district_id: req.params.id,
    },
  },
  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        village: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      village: doc,
    });
  });
};

exports.update = async (req, res) => {
  villageModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        village: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      village: [doc],
    });
  });
};

exports.delete = async (req, res) => {
  villageModel.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        village: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      village: doc,
    });
  });
};
