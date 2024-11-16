const express = require('express');
const router = express.Router();
const { getAllAttendance } = require('../controllers/adminAttendence');

router.get('/all', getAllAttendance);


module.exports = router;
