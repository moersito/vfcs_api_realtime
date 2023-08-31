const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const jobLevelSchema = new Schema({
  job_level_name: { type: String, required: true, max: 100 },
});

// Export the model
module.exports = mongoose.model(strings.Job_level, jobLevelSchema);
