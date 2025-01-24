const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  description: String,
  semester: String,
  instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeringDept: String,
});

module.exports = mongoose.model('Course', courseSchema);
