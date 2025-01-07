const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getAttendanceStatus } = require('../controllers/attendanceController');

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/status', getAttendanceStatus);

module.exports = router;
