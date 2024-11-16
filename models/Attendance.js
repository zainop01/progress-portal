const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  sessions: [
    {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date },
      hours: { type: Number, default: 0 }, // Duration of this session in hours
    },
  ],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
