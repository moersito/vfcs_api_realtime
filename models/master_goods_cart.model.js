const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const masterGoodsCartSchema = new Schema({
  transactionalNumber: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  goodsTypeID: { type: String },
  goodsTypeName: { type: String },
  sacks: { type: Number },
  tonase: { type: Number },
  sacks: { type: Number },
  codeID: { type: String },
  codeName: { type: String },
  createdUser: { type: Schema.Types.ObjectId, ref: strings.Users },
  // fileName1: { type: String },
  // filePath1: { type: String },
  // fileName2: { type: String },
  // filePath2: { type: String },
  attachment: {
    fileName1: {
      file_name: { type: String },
      file_path: { type: String },
    },
    fileName2: {
      file_name: { type: String },
      file_path: { type: String },
    },
  },
});

// Export the model
module.exports = mongoose.model(strings.MasterGoodsCart, masterGoodsCartSchema);
