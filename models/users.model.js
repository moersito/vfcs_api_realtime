const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const usersSchema = new Schema({
  user_name: { type: String, max: 100 },
  user_code: { type: String, required: true, max: 100 },
  user_email: { type: String },
  user_password: { type: String, required: true, max: 255 },
  role_user_id: { type: String },
  user_phone: { type: String, max: 15 },
  user_address: { type: String },
  ktp: { type: String },
  no_ktp: { type: String },
  kk: { type: String },
  surface_area: { type: String },
  province_id: { type: String },
  province_name: { type: String },
  regency_id: { type: String },
  regency_name: { type: String },
  city_id: { type: String },
  city_name: { type: String },
  sub_district: { type: String },
  district_id: { type: String },
  district_name: { type: String },
  village_id: { type: String },
  village_name: { type: String },
  legacy_number: { type: String },
  postal_code: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  parent: { type: String },
  department: { type: String },
  job: { type: String },
  job_level: { type: String },
  created_date: { type: Date, default: Date.now },
  created_by: { type: String },
  attachment: {
    owners: {
      file_name: { type: String },
      file_path: { type: String },
    },
    location: {
      file_name: { type: String },
      file_path: { type: String },
    },
    member: {
      file_name: { type: String },
      file_path: { type: String },
    },
    identification: {
      file_name: { type: String },
      file_path: { type: String },
    },
    sign: {
      file_name: { type: String },
      file_path: { type: String },
    },
  },
});

// Export the model
module.exports = mongoose.model(strings.Users, usersSchema);
