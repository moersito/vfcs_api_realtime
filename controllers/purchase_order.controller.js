const purchaseOrderModel = require('../models/purchase_order.model');
const strings = require('../utils/strings');

function getCodeDate() {
	const digit = 2;
	const d = new Date();
	const codeHH = d.getDate().toString().padStart(digit, '0');
	const codeBB = (d.getMonth() + 1).toString().padStart(digit, '0');
	return codeHH + codeBB;			
}

function getCodeRandom(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max-min));
}

exports.create = async (req, res) => {
 const codeNew = getCodeDate()+getCodeRandom(1,999);
  req.body.code = `${strings.code.PurchaseOrder} ${codeNew}`;
  purchaseOrderModel.create(req.body, (err, doc) => {
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
  purchaseOrderModel.find({}, (err, doc) => {
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
  purchaseOrderModel.findOne({ _id: req.params.id }, (err, doc) => {
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
  purchaseOrderModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
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
  purchaseOrderModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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

exports.getPurchaseRecycler = async (req, res) => {
  purchaseOrderModel.find({ createdUser: req.params.id }, (err, user) => {
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
  });
};
