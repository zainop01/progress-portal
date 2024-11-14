const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://zainop001:zain7860@tinfin.xp1km.mongodb.net/?retryWrites=true&w=majority&appName=tinfin");
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
