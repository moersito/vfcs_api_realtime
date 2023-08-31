const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

// StatusReceiving 1 = RM, StatusReceiving 2 = RB

const ReceivingMaterialSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true },
  code: { type: String },
  fileName: { type: String },
  filePath: { type: String },
  signName: { type: String },
  signPath: { type: String },
  createdUser: { type: Schema.Types.ObjectId, ref: strings.Users },
  weight: { type: Number, default: 0 },
  tempWeight: { type: Number, default: 0 },
  statusReceiving: { type: Number, default: 0 },
  statusReport: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.ReceivingMaterials, ReceivingMaterialSchema);
