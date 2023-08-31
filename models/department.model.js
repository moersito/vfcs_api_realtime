const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const departmentSchema = new Schema({
  department_name: { type: String, required: true, max: 100 },
});

// Export the model
module.exports = mongoose.model(strings.Department, departmentSchema);
