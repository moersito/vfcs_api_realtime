const mongoose = require('mongoose');
const strings = require('../utils/strings');

const { Schema } = mongoose;

const jobSchema = new Schema({
  job_name: { type: String, required: true, max: 100 },
});

// Export the model
module.exports = mongoose.model(strings.Job, jobSchema);
