const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  mail_id: { type: String, unique: true },
  facultyId: mongoose.Schema.Types.ObjectId,
  batch: String,
  profession: String,
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entryNo: { type: String, unique: true, sparse: true },
  year: String,
  department: String,
});

module.exports = mongoose.model('User', userSchema);
