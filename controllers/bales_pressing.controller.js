const mongoose = require('mongoose');
const balesPressingModel = require('../models/bales_pressing.model');
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
  req.body.code = `${strings.code.BalesPress} ${codeNew}`;
  balesPressingModel.create(req.body, (err, value) => {
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
exports.details = async (req, res) => {
  balesPressingModel.findOne({ _id: req.params.id }, (err, doc) => {
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

exports.getBalesDraft = async (req, res) => {
  balesPressingModel.find({ statusReport: 'Draft' }, (err, user) => {
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

exports.getBalesDraftById = async (req, res) => {
  balesPressingModel.find({ statusReport: 'Draft', createdBy: mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
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

exports.getBales = async (req, res) => {
  balesPressingModel.find((err, user) => {
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

exports.getBalesByStatusId = async (req, res) => {
  balesPressingModel.find({ createdBy: mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
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
  req.body.balesBatch.forEach((element) => {
    balesPressingModel.updateOne({ _id: element.name }, {
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

exports.getTotalWeight = async (req, res) => {
  balesPressingModel.find({}, (err, doc) => {
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
      quantity += e.weight;
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

exports.getTotalWeightByUser = async (req, res) => {
  balesPressingModel.find({ createdBy: mongoose.Types.ObjectId(req.params.id) }, (err, doc) => {
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
      quantity += e.weight;
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
  balesPressingModel.aggregate(
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

exports.getTotalTransactionByUser = async (req, res) => {
  balesPressingModel.aggregate(
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

exports.getByDateRangeUser = async (req, res) => {
  balesPressingModel.aggregate(
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

exports.deleteById = (req, res) => {
  balesPressingModel.deleteMany({ _id: req.params.id }, (err, doc) => {
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
