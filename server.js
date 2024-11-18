const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const https = require('https'); // Import https module

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/attendance', require('./routes/adminAttendence'));
app.use('/api/admin/progress', require('./routes/adminProgress'));

// Keep-Alive Route
app.get('/keep-alive', (req, res) => {
  res.send('Server is alive');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Keep-Alive Mechanism
const keepAliveUrl = 'https://progress-portal.onrender.com/keep-alive'; // Replace with your Render URL
setInterval(() => {
  const client = keepAliveUrl.startsWith('https') ? https : http; // Choose the correct module
  client.get(keepAliveUrl, (res) => {
    console.log(`Keep-alive ping sent: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Keep-alive error: ${err.message}`);
  });
}, 5000); // Ping every 5 seconds
