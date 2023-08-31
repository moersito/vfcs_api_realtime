const mongoose = require('mongoose');

const { Schema } = mongoose;

const villageSchema = new Schema({
  id: { type: Number, index: true },
  name: String,
}).index({ name: 'text' });

const districtSchema = new Schema({
  id: { type: Number, index: true },
  name: String,
  villages: [villageSchema],
}).index({ name: 'text' });

const regencySchema = new Schema({
  id: { type: Number, index: true },
  name: String,
  longitude: String,
  latitude: String,
  districts: [districtSchema],
}).index({ name: 'text' });

const provinceSchema = new Schema({
  id: { type: Number, index: true },
  name: String,
  regencies: [regencySchema],
}).index({ name: 'text' });

// Export the model
module.exports = mongoose.model('IndonesiaProvince', provinceSchema);
