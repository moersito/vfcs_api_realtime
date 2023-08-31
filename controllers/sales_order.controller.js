const SalesOrderModel = require('../models/sales_order.model');
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
  req.body.code = `${strings.code.SalesOrder} ${codeNew}`;
  SalesOrderModel.create(req.body, (err, value) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    const a = value.populate('createdUser').execPopulate();
    a.then((doc) => res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc],
    }));
  });
};

exports.get = (req, res) => {
  SalesOrderModel.find({}, (err, doc) => {
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
  }).populate('createdUser');
};

exports.getById = (req, res) => {
  SalesOrderModel.findOne({ _id: req.params.id }, (err, doc) => {
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
  }).populate('createdUser');
};

exports.update = async (req, res) => {
  SalesOrderModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, doc) => {
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
  SalesOrderModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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

exports.getTotalWeight = async (req, res) => {
  SalesOrderModel.find({}, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    let quantity = 0;
    doc.forEach((e) => {
      quantity += e.qty;
    });
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      total: quantity,
      docs: [],
    });
  });
};

exports.getTotalTransaction = async (req, res) => {
  SalesOrderModel.aggregate(
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
