const deliveryOrderModel = require('../models/delivery_order.model');
const balesModel = require('../models/bales_pressing.model');
const receivingModel = require('../models/receiving_material.model');
const strings = require('../utils/strings');

exports.get = async (req, res) => {
  if (req.params.id.includes('DO -')) {
    const data = await deliveryOrderModel.find({ code: req.params.id }).populate(
      {
        path: 'balesBatch.item',
        populate: {
          path: 'productionOrder.item',
          populate: {
            path: 'receivingMaterial.item',
          },
        },
      },
    );
    res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      tracking: data,
    });
  } else {
    const data = await deliveryOrderModel.find({ code: req.params.id }).populate(
      {
        path: 'balesBatch.itemReceiving',
        populate: {
          path: 'receivingMaterial.item',
        },
      },
    );
    res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      tracking: data,
    });
  }
};

exports.getBales = async (req, res) => {
  if (req.params.id.includes('BP -')) {
    const data = await balesModel.find({ code: req.params.id }).populate(
      {
        path: 'productionOrder.item',
        populate: {
          path: 'receivingMaterial.item',
          populate: {
            path: 'mastergoodscarts.transactionalNumber',
          },
        },
      },
    );
    res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      tracking: data,
    });
  } else {
    const data = await receivingModel.aggregate([
      {
        $match: {
          code: req.params.id,
        },

      },
      {
        $addFields: {
          rec_id: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'mastergoodscarts',
          localField: 'rec_id',
          foreignField: 'transactionalNumber',
          as: 'detail',
        },
      },
    ]);
    res.send({
      status: '200',
      error: false,
      msg: strings.response.success_created,
      tracking: data,
    });
  }
};
