const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminUsers');

router.get('/users', getAllUsers);


module.exports = router;
