const express = require('express');
const router = express.Router();
const { submitProgress } = require('../controllers/progressController');

router.post('/submit', submitProgress);

module.exports = router;
