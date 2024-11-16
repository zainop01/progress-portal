const User = require('../models/User');

// Get all users with search and pagination
exports.getAllUsers = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search ? { name: new RegExp(search, 'i') } : {};

  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(query);

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
