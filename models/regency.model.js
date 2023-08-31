const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const regencySchema = new Schema({
  id: { type: String },
  province_id: { type: String },
  name: { type: String },
  alt_name: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

// Export the model
module.exports = mongoose.model(strings.Regency, regencySchema);
