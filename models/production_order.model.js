const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const childSchema = new Schema({ item: { type: Schema.Types.ObjectId, ref: strings.ReceivingMaterials }, qty: 'number', type: 'string' });

const ProductionOrderSchema = new Schema({
  receivingMaterial: [childSchema],
  qty: Number,
  code: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: strings.Users },
  createdDate: { type: Date, default: Date.now },
  statusReport: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.ProductionOrder, ProductionOrderSchema);
