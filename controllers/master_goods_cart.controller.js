const mongoose = require('mongoose');
const masterGoodsModel = require('../models/master_goods_cart.model');
const recMaterialModel = require('../models/receiving_material.model');
const strings = require('../utils/strings');

// exports.create = async (req, res) => {
//   masterGoodsModel.create(req.body, (err, doc) => {
//     if (err) {
//       return res.send({
//         msg: strings.response.failed_created,
//         error: true,
//         status: 200,
//         err,
//         doc: [],
//       });
//     }
//     const data = {
//       ...doc, createdUser: null,
//     };
//     return res.send({
//       msg: strings.response.success_created,
//       error: false,
//       status: 200,
//       doc: [data],
//     });
//   });
// };

exports.create = (req, res) => {
   masterGoodsModel.create({
     transactionalNumber: req.body.transactionalNumber,
     goodsTypeID: req.body.goodsTypeID,
     goodsTypeName: req.body.goodsTypeName,
     tonase: req.body.tonase,
     sacks: req.body.sacks,
    //  fileName1: req.files.photo1[0].filename,
    //  fileName2: req.files.photo2[0].filename,
    attachment: {
      fileName1: {
        file_name: (typeof (req.files.photo1) !== 'undefined') ? req.files.photo1[0].filename : null,
      },
      fileName2: {
        file_name: (typeof (req.files.photo2) !== 'undefined') ? req.files.photo2[0].filename : null,
      },
    },
   }, (err, doc) => {
    if (err) {
      return res.send({
        msg: strings.response.failed_created,
        error: true,
        status: 200,
        err,
        doc: [],
      });
    }
    const data = {
      ...doc, createdUser: null,
    };
    return res.send({
      msg: strings.response.success_created,
      error: false,
      status: 200,
      doc: [data],
    });
  });
};

exports.get = (req, res) => {
  masterGoodsModel.find({}, (err, doc) => {
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
  masterGoodsModel.findOne({ _id: req.params.id }, (err, doc) => {
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

exports.getByIdTransaction = (req, res) => {
  masterGoodsModel.find({ transactionalNumber: req.params.id }, (err, doc) => {
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

exports.deleteById = (req, res) => {
  masterGoodsModel.deleteOne({ _id: req.params.id }, (err, doc) => {
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

exports.deleteByTransaction = (req, res) => {
  masterGoodsModel.deleteMany({ transactionalNumber: req.params.id }, (err, doc) => {
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

exports.updateBatch = (req, res) => {
  masterGoodsModel.updateMany({ transactionalNumber: req.body.transactionalNumber }, {
    $set: {
      codeID: req.body.codeID,
      codeName: req.body.codeName,
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
};

exports.getSumTonase = (req, res) => {
  masterGoodsModel.find({}, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
      });
    }
    let qty = 0;
    doc.forEach((e) => {
      qty += e.tonase;
    });
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      total: qty,
      docs: [],
    });
  });
};

exports.getSumTonaseById = (req, res) => {
  masterGoodsModel.find({ createdUser: mongoose.Types.ObjectId(req.params.id) }, (err, doc) => {
    if (err) {
      return res.send({
        status: '200',
        error: true,
        msg: strings.response.failed_created,
        docs: [],
      });
    }
    let qty = 0;
    doc.forEach((e) => {
      qty += e.tonase;
    });
    return res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      total: qty,
      docs: [],
    });
  });
};

exports.totalDownlineRec = async (req, res) => {
  recMaterialModel.aggregate(
    [
      {
        $group:
        {
          _id: {
            supplierId: '$supplierId',
          },
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

exports.totalDownlineRecById = async (req, res) => {
  recMaterialModel.aggregate(
    [
      {
        $match: {
          $and: [
            {
              createdUser: mongoose.Types.ObjectId(req.params.id),
            },
            {
              statusReceiving: Number(req.params.status),
            },
          ],
        },
      },
      {
        $group:
        {
          _id: {
            supplierId: '$supplierId',
          },
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

exports.getRangeGroupUser = async (req, res) => {
  masterGoodsModel.aggregate(
    [
      {
        $group:
        {
          _id: '$createdUser',
          totalAmount: { $sum: '$tonase' },
          count: { $sum: 1 },
        },
      },

      {
        $lookup:
        {
          from: strings.Users,
          localField: '_id',
          foreignField: '_id',
          as: 'user_docs',
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      { $limit: 4 },
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
        amount: user.length === 0 ? 0 : user[0].totalAmount,
        doc: user,
      });
    },
  );
};
