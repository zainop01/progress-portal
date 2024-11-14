const Progress = require('../models/Progress');

// Submit daily progress
exports.submitProgress = async (req, res) => {
  const userId = req.body.userId; // Get userId from request body
  const { progress } = req.body;
  const today = new Date().toISOString().split('T')[0];

  try {
    let existingProgress = await Progress.findOne({ userId, date: today });
    if (existingProgress) return res.status(400).json({ msg: 'Progress already submitted for today' });

    const currentHour = new Date().getHours();
    if (currentHour >= 22) return res.status(400).json({ msg: 'Progress submission time is over (10 PM)' });

    const newProgress = new Progress({ userId, date: today, progress });
    await newProgress.save();

    res.json({ msg: 'Progress submitted successfully', progress: newProgress });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
