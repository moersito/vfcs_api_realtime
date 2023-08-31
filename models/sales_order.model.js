const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const SalesOrderSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  code: { type: String },
  deliveryNumber: { type: String },
  goodsTypeID: { type: String },
  goodsTypeName: { type: String },
  qty: { type: Number },
  createdUser: { type: Schema.Types.ObjectId, ref: strings.Users },
  statusReport: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.SalesOrder, SalesOrderSchema);
