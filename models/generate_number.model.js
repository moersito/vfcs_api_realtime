const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const generateNumberSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: strings.Users },
  nomor: { type: String, required: true },
  jenis: { type: String },
  status: { type: String },
  createdDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model(strings.GenerateNumber, generateNumberSchema);
