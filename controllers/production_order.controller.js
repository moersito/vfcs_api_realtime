const mongoose = require('mongoose');
const productionOrderModel = require('../models/production_order.model');
const receivingMaterialModel = require('../models/receiving_material.model');
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
  req.body.code = `${strings.code.ProdOrder} ${codeNew}`;
  productionOrderModel.create(req.body, (err, value) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        doc: [],
      });
    }

    const a = value.populate('createdBy').execPopulate();
    a.then((doc) => res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [doc],
    }));
  });
};

exports.get = (req, res) => {
  // productionOrderModel.find({}, (err, doc) => {
  productionOrderModel.aggregate([
    {
      $lookup: {
        from: 'productionordercarts',
        localField: '_id',
        foreignField: 'transactionalNumber',
        as: 'carts',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: '$createdBy',
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

exports.getByUser = (req, res) => {
  productionOrderModel
    .aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'productionordercarts',
          localField: '_id',
          foreignField: 'transactionalNumber',
          as: 'carts',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $unwind: '$createdBy',
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

exports.getProductionOrderDraft = async (req, res) => {
  productionOrderModel.find({ statusReport: 'Draft' }, (err, user) => {
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
  }).populate('createdBy');
};

exports.getProductionOrderCompleted = async (req, res) => {
  productionOrderModel.find({ statusReport: 'Completed' }, (err, user) => {
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
  }).populate('createdBy');
};

exports.getProductionOrderCompletedByIdUser = async (req, res) => {
  productionOrderModel.find({ statusReport: 'Completed', createdBy: mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
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
  }).populate('createdBy');
};

exports.updateStatusById = (req, res) => {
  req.body.productionOrder.forEach((element) => {
    productionOrderModel.updateOne({ _id: element.name }, {
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
  });
};

exports.updateTransactionById = (req, res) => {
  productionOrderModel.updateOne({ _id: req.params.id }, {
    $set: {
      statusReport: req.body.statusReport,
      receivingMaterial: req.body.receivingMaterial,
      qty: req.body.qty,
    },
  }, (err, value) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
      });
    }
    res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [value],
    });
  });
};

exports.details = async (req, res) => {
  productionOrderModel.findOne({ _id: req.params.id }, (err, doc) => {
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
};

exports.totalTransaction = async (req, res) => {
  productionOrderModel.aggregate(
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

exports.totalTransactionByUser = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: { createdBy: mongoose.Types.ObjectId(req.params.id) },
      },
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

exports.totalQty = async (req, res) => {
  productionOrderModel.find({}, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
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

exports.totalQtyByUser = async (req, res) => {
  productionOrderModel.find({ createdBy: mongoose.Types.ObjectId(req.params.id) }, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
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

exports.getByDateRangeUser = async (req, res) => {
  productionOrderModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdBy: req.body.id,
        },
      },
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
        doc: user,
      });
    },
  );
};

exports.deleteById = async (req, res) => {
  req.body.carts.forEach((e) => {
    retRMValue(e.receivingMaterial, e.qty);
  });
  const data = await productionOrderModel.deleteOne({ _id: req.params.id });
  return res.send({
    msg: strings.response.success_created,
    error: false,
    status: 200,
    doc: [data],
  });
};

const retRMValue = async (item, qty) => {
  await receivingMaterialModel.updateOne(
    { _id: item },
    { $inc: { tempWeight: qty } },
  );
};
