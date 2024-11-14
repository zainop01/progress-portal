const Attendance = require('../models/Attendance');

// Check-in for the day
exports.checkIn = async (req, res) => {
  const userId = req.body.userId; // Get userId from request body
  const today = new Date().toISOString().split('T')[0];

  try {
    let attendance = await Attendance.findOne({ userId, date: today });
    if (attendance) return res.status(400).json({ msg: 'Already checked in today' });

    attendance = new Attendance({
      userId,
      checkIn: new Date(),
      date: today,
    });

    await attendance.save();
    res.json({ msg: 'Checked in successfully', attendance });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Check-out for the day
exports.checkOut = async (req, res) => {
  const userId = req.body.userId; // Get userId from request body
  const today = new Date().toISOString().split('T')[0];

  try {
    const attendance = await Attendance.findOne({ userId, date: today });
    if (!attendance || attendance.checkOut)
      return res.status(400).json({ msg: 'Check-in record not found or already checked out' });

    attendance.checkOut = new Date();
    await attendance.save();
    res.json({ msg: 'Checked out successfully', attendance });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
