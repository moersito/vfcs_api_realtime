const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const uomSchema = new Schema({
  uom_name: { type: String, required: true, max: 100 },
  uom_unit: { type: String },
  uom_price: { type: Number },
  status_active: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.Uom, uomSchema);
