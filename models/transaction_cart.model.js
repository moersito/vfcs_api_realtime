const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const transactionCartSchema = new Schema({
  transactionalNumber: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  goodsTypeID: { type: String },
  goodsTypeName: { type: String },
  //fileName1: { type: String },
  //filePath1: { type: String },
  //fileName2: { type: String },
  //filePath2: { type: String },
  tonase: { type: Number },
  sacks: { type: Number },
});

// Export the model
module.exports = mongoose.model(strings.TransactionCart, transactionCartSchema);
