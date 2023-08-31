const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const childSchema = new Schema({ item: { type: Schema.Types.ObjectId, ref: strings.BalesPressing }, itemReceiving: { type: Schema.Types.ObjectId, ref: strings.ReceivingMaterials }, weight: 'string' });

// 1 DO, 2 DO Bales

const DeliveryOrderSchema = new Schema({
  poNumber: { type: String },
  code: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: strings.Users },
  createdDate: { type: Date, default: Date.now },
  vehicle: { type: String },
  numberVehicle: { type: String },
  driver: { type: String },
  feedstockType: { type: String },
  balesBatch: [childSchema],
  statusReport: { type: String },
  customerName: { type: String, required: true },
  statusReceiving: { type: Number, default: 0 },
});

// Export the model
module.exports = mongoose.model(strings.DeliveryOrder, DeliveryOrderSchema);
