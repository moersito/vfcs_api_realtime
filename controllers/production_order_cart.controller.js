const productionOrderCartModel = require('../models/production_order_cart.model');
const receivingMaterialModel = require('../models/receiving_material.model');
const strings = require('../utils/strings');

exports.create = async (req, res) => {
  productionOrderCartModel.create(req.body, (err, data) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        productionOrderCart: [],
      });
    }
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      productionOrderCart: [data],
    });
  });
};

exports.get = (req, res) => {
  productionOrderCartModel.find({}, (err, doc) => {
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

exports.getTransactionById = (req, res) => {
  productionOrderCartModel.find({ transactionalNumber: req.params.id }, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        productionOrderCart: [],
      });
    }
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      productionOrderCart: doc,
    });
  });
};

exports.updateStatusById = (req, res) => {
  // req.body.receivingMaterial.forEach((element) => {
  productionOrderCartModel.updateOne({ _id: req.params.id }, {
    $set: {
      statusReport: req.body.statusReport,
    },
  }, (err, doc) => {
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
  });
  // });
};

exports.deleteById = async (req, res) => {
  await receivingMaterialModel.updateOne(
    { code: req.body.code },
    { $inc: { tempWeight: req.body.qty } },
  );
  const item = await productionOrderCartModel.deleteOne({ _id: req.params.id });
  return res.send({
    status: '200',
    error: false,
    msg: strings.response.success_created,
    docs: [item],
  });
};
