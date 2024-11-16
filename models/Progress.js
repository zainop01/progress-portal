const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true }, // Change from String to Date
  progress: { type: String, required: true },
});

module.exports = mongoose.model('Progress', progressSchema);
