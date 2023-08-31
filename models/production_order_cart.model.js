const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const productionOrderCartSchema = new Schema({
  transactionalNumber: { type: Schema.Types.ObjectId, ref: strings.ProductionOrder },
  createdDate: { type: Date, default: Date.now },
  receivingMaterial: { type: Schema.Types.ObjectId, ref: strings.ReceivingMaterials },
  qty: { type: Number },
  type: { type: String },
  code: { type: String },
  supplierName: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.ProductionOrderCart, productionOrderCartSchema);
