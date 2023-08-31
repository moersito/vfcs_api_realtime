const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const materialGoods = new Schema({
  name: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: strings.Users },
  createdDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model(strings.MaterialGoods, materialGoods);
