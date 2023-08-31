const jobModel = require('../models/job.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  jobModel.create(req.body, (err, doc) => {
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
  jobModel.find({}, (err, doc) => {
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

exports.getById = (req, res) => {
  jobModel.findOne({ _id: req.params.id }, (err, doc) => {
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
  jobModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
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
  jobModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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
