const Progress = require('../models/Progress');
const User = require('../models/User');

// Get all progress records with search, date filter, and pagination
exports.getAllProgress = async (req, res) => {
  const { search, page = 1, limit = 10, startDate, endDate } = req.query;
  const dateQuery = {};

  if (startDate) dateQuery.$gte = new Date(startDate);
  if (endDate) dateQuery.$lte = new Date(endDate);

  try {
    const users = await User.find({ name: new RegExp(search, 'i') }).select('_id'); 
    const userIds = users.map(user => user._id);
    const query = { userId: { $in: userIds }, ...(startDate || endDate ? { date: dateQuery } : {}) };

    const progressRecords = await Progress.find(query)
      .populate('userId', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Progress.countDocuments(query);

    res.json({ progressRecords, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
