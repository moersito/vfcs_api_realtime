const mongoose = require('mongoose');
const masterGoodsCartModel = require('../models/master_goods_cart.model');
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
  if (req.body.statusReceiving === '1') {
  	req.body.code = `${strings.code.Receiving} ${codeNew}`;
  } else {
    req.body.code = `${strings.code.ReceivingBales} ${codeNew}`;
  }
  receivingMaterialModel.create(req.body, (err, value) => {
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
  receivingMaterialModel.find({}, (err, doc) => {
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

exports.getStatusReceiving = (req, res) => {
  receivingMaterialModel.find({
    statusReceiving: req.params.status,
    createdUser: mongoose.Types.ObjectId(req.params.id),
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
      docs: doc,
    });
  }).populate('createdUser');
};

exports.getStatusReceivingNoUser = (req, res) => {
  receivingMaterialModel.find({
    statusReceiving: req.params.status,
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
      docs: doc,
    });
  }).populate('createdUser');
};

exports.getById = (req, res) => {
  receivingMaterialModel.findOne({ _id: req.params.id }, (err, doc) => {
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
  }).populate('createdUser');
};

exports.updateById = (req, res) => {
  masterGoodsCartModel.find({ transactionalNumber: req.body._id }, (err, value) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
      });
    }

    let totalTonase = 0;
    value.forEach((e) => {
      totalTonase += e.tonase;
    });
    receivingMaterialModel.updateOne({ _id: req.body._id }, {
      $set: {
        statusReport: req.body.statusReport,
        fileName: req.files.photo[0].filename,
        signName: req.files.signature[0].filename,
        weight: totalTonase,
        tempWeight: totalTonase,
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
  }).populate('createdUser');
};

exports.updateStatusById = (req, res) => {
  req.body.receivingMaterial.forEach((element) => {
    receivingMaterialModel.find({ _id: element.name }, (err, value) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          doc: [],
        });
      }
      receivingMaterialModel.updateOne({ _id: element.name }, {
        $set: {
          statusReport: req.body.statusReport,
          tempWeight: value[0].tempWeight - element.qty,
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
  });
};

exports.getReceivingMaterialCompleted = async (req, res) => {
  receivingMaterialModel.find({ statusReport: 'Completed' }, (err, user) => {
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
  }).populate('createdUser');
};

exports.getRecMaterialCompletedByID = async (req, res) => {
  receivingMaterialModel.find({
    statusReport: 'Completed',
    createdUser: mongoose.Types.ObjectId(req.params.id),
  }, (err, user) => {
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
  }).populate('createdUser');
};

exports.getReceivingMaterialDraft = async (req, res) => {
  receivingMaterialModel.find({ statusReport: 'Draft' }, (err, user) => {
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

exports.getReceivingMaterialWeight = async (req, res) => {
  receivingMaterialModel.find(
    { $or: [{ $and: [{ statusReport: 'Completed' }, { statusReceiving: 1 }] }, { $and: [{ statusReport: 'Done' }, { tempWeight: { $gt: 0 } }, { statusReceiving: 1 }] }] }, (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          receivingMaterial: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        receivingMaterial: user,
      });
    },
  ).populate('createdUser');
};

exports.getReceivingMaterialWeightByUser = async (req, res) => {
  receivingMaterialModel.find(
    {
      $or: [{
        $and:
      [{ statusReport: 'Completed' }, { statusReceiving: 1 }, { createdUser: mongoose.Types.ObjectId(req.params.id) }],
      },
      {
        $and:
        [{ statusReport: 'Done' }, { tempWeight: { $gt: 0 } }, { statusReceiving: 1 }, { createdUser: mongoose.Types.ObjectId(req.params.id) }],
      }],
    }, (err, user) => {
      if (err) {
        return res.send({
          msg: strings.response.failed_created,
          error: true,
          status: 200,
          err,
          receivingMaterial: [],
        });
      }
      return res.send({
        msg: strings.response.success_created,
        error: false,
        status: 200,
        receivingMaterial: user,
      });
    },
  ).populate('createdUser');
};

exports.getByDateRange = (req, res) => {
  receivingMaterialModel.find({
    createdDate: {
      $gte: new Date(req.body.createdStart).toISOString(),
      $lt: new Date(req.body.createdEnd).toISOString(),
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
      docs: doc,
    });
  });
};

exports.totalTonase = (req, res) => {
  receivingMaterialModel.find({}, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: `${strings.response.failed_created}, ${err}`,
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

exports.getByDateRangeUser = async (req, res) => {
  receivingMaterialModel.aggregate(
    [
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from),
            $lte: new Date(req.body.to),
          },
          createdUser: req.body.id,
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
  receivingMaterialModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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

exports.getReceivingBalesCompleted = async (req, res) => {
  receivingMaterialModel.find({ $and: [{ statusReport: 'Completed' }, { statusReceiving: 2 }] }, (err, user) => {
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
  }).populate('createdUser');
};

exports.getRecBalesCompletedByIdUser = async (req, res) => {
  receivingMaterialModel.find({
    $and: [
      { statusReport: 'Completed' },
      { statusReceiving: 2 },
      { createdUser: mongoose.Types.ObjectId(req.params.id) }],
  }, (err, user) => {
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
  }).populate('createdUser');
};
