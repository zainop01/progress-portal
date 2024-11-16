const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/attendance', require('./routes/adminAttendence'));
app.use('/api/admin/progress', require('./routes/adminProgress'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
