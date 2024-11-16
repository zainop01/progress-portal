const User = require('../models/User');
const Attendance = require('../models/Attendance');

exports.getAllAttendance = async (req, res) => {
  const { search = '', page = 1, limit = 10, startDate, endDate } = req.query;
  const dateQuery = {};

  if (startDate) dateQuery.$gte = startDate;
  if (endDate) dateQuery.$lte = endDate;

  try {
    const users = await User.find({ name: new RegExp(search, 'i') }).select('_id');
    const userIds = users.map(user => user._id);

    const query = {
      userId: { $in: userIds },
      ...(Object.keys(dateQuery).length ? { date: dateQuery } : {}),
    };

    const attendanceRecords = await Attendance.find(query)
      .populate('userId', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Attendance.countDocuments(query);

    const formattedRecords = attendanceRecords.map(record => {
      const recordObj = record.toObject();
      const totalHours = record.sessions.reduce((sum, session) => sum + (session.hours || 0), 0);

      recordObj.sessions = record.sessions.map(session => ({
        checkIn: session.checkIn,
        checkOut: session.checkOut,
        hours: session.hours ? session.hours.toFixed(2) : 'N/A',
      }));

      recordObj.totalHours = totalHours.toFixed(2);
      return recordObj;
    });

    res.json({
      attendanceRecords: formattedRecords,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
