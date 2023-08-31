const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const VillagesSchema = new Schema({
  id: { type: String },
  district_id: { type: String },
  name: { type: String },
  alt_name: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

// Export the model
module.exports = mongoose.model(strings.Village, VillagesSchema);
