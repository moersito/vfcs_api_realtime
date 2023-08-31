const indonesiaModel = require('../models/indonesia_mongo.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  indonesiaModel.create(req.body, (err, doc) => {
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

exports.getProvinces = async (req, res) => {
  indonesiaModel.find({}, (err, doc) => {
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
  }).select('name id -_id');
};

exports.getProvincesById = async (req, res) => {
  indonesiaModel.aggregate([
    {
      $match: { id: req.body.id },
    },
  ], (err, doc) => {
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

exports.getRegenciesById = async (req, res) => {
  indonesiaModel.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $match: {
        'regencies.id': req.body.id,
      },
    },

  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        value: req.params.id,
        docs: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      value: req.params.id,
      docs: doc,
    });
  });
};

exports.getDistrictsById = async (req, res) => {
  indonesiaModel.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $unwind: '$regencies.districts',
    },
    {
      $match: {
        'regencies.districts.id': req.body.id,
      },
    },
  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        value: req.params.id,
        docs: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      value: req.params.id,
      docs: doc,
    });
  });
};

exports.getVillagesById = async (req, res) => {
  indonesiaModel.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $unwind: '$regencies.districts',
    },
    {
      $unwind: '$regencies.districts.villages',
    },
    {
      $match: {
        'regencies.districts.villages.id': req.body.id,
      },
    },
  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        value: req.params.id,
        docs: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      value: req.params.id,
      docs: doc,
    });
  });
};

exports.changeDataLonglat = async (req, res) => {
  indonesiaModel.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $match: {
        'regencies.id': 'id',
      },
    },
  ], (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        value: req.params.id,
        docs: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      value: req.params.id,
      docs: doc,
    });
  });
};
