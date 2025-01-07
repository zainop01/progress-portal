const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
  const userId = req.body.userId;
  const today = new Date().toISOString().split('T')[0];

  try {
    let attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance) {
      // Create a new attendance record for today
      attendance = new Attendance({
        userId,
        date: today,
        sessions: [{ checkIn: new Date() }],
      });
    } else {
      // Check if the last session is missing a check-out
      const lastSession = attendance.sessions[attendance.sessions.length - 1];
      if (lastSession && !lastSession.checkOut) {
        return res.status(400).json({
          msg: 'You must check out before checking in again.',
        });
      }
      // Add a new session for this check-in
      attendance.sessions.push({ checkIn: new Date() });
    }

    await attendance.save();
    res.json({ msg: 'Checked in successfully', attendance });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};




exports.checkOut = async (req, res) => {
  const userId = req.body.userId;
  const today = new Date().toISOString().split('T')[0];

  try {
    const attendance = await Attendance.findOne({ userId, date: today });
    if (!attendance) {
      return res.status(400).json({ msg: 'Check-in record not found for today.' });
    }

    const lastSession = attendance.sessions[attendance.sessions.length - 1];
    if (!lastSession || lastSession.checkOut) {
      return res.status(400).json({ msg: 'No active check-in session found to check out.' });
    }

    const checkOutTime = new Date();
    const hoursWorked =
      (checkOutTime.getTime() - new Date(lastSession.checkIn).getTime()) / (1000 * 60 * 60);

    lastSession.checkOut = checkOutTime;
    lastSession.hours = hoursWorked;

    await attendance.save();
    res.json({ msg: 'Checked out successfully', attendance });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


exports.getAttendanceStatus = async (req, res) => {
  const userId = req.query.userId;
  const today = new Date().toISOString().split('T')[0];

  try {
    const attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance || attendance.sessions.length === 0) {
      return res.json({ checkedIn: false });
    }

    const lastSession = attendance.sessions[attendance.sessions.length - 1];
    res.json({
      checkedIn: !lastSession.checkOut,
      attendance,
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
