const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const roleUserSchema = new Schema({
  role_user_name: { type: String, required: true, max: 100 },
  seq_role: { type: String },
});

// Export the model
module.exports = mongoose.model(strings.Role_user, roleUserSchema);
