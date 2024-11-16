const express = require('express');
const router = express.Router();
const { getAllProgress } = require('../controllers/adminProgress');

router.get('/all', getAllProgress);


module.exports = router;
