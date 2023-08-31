const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const childSchema = new Schema(
  { item: { type: Schema.Types.ObjectId, ref: strings.ProductionOrder } },
);

const BalesPressingSchema = new Schema({
  productionOrder: [childSchema],
  code: { type: String },
  weight: Number,
  typeGoods: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: strings.Users },
  createdDate: { type: Date, default: Date.now },
  statusReport: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.BalesPressing, BalesPressingSchema);
