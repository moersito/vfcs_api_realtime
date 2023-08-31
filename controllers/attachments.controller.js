const AttachmentsModel = require('../models/attachments.model');
const strings = require('../utils/strings');

exports.attachment_create = function (req, res) {
  const attachment = new AttachmentsModel(
    {
      attachment_name: req.body.attachment_name,
      created_by: req.body.created_by,
    },
  );

  attachment.save((err) => {
    if (err) {
      return next(err);
    }
    res.send(strings.response.success_created);
  });
};

exports.product_details = function (req, res) {
  AttachmentsModel.findById(req.params.id, (err, product) => {
    if (err) return next(err);
    res.send(product);
  });
};

exports.products = function (req, res) {
  AttachmentsModel.find((err, product) => {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_update = function (req, res) {
  AttachmentsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
    if (err) return next(err);
    res.send('Product udpated.');
  });
};

exports.product_delete = function (req, res) {
  AttachmentsModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.send('Deleted successfully!');
  });
};
