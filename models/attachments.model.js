const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const AttachmentsSchema = new Schema({
  attachment_name: { type: String, required: true, max: 100 },
  created_date: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model(strings.Attachments, AttachmentsSchema);
