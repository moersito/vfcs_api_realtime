const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const PurchaseOrderSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true },
  code: { type: String },
  createdUser: { type: Schema.Types.ObjectId, ref: strings.Users },
  statusReport: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.PurchaseOrder, PurchaseOrderSchema);
