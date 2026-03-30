const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for user registration - no auth middleware here, open to all
router.post('/register', registerUser);

// Route for user login - no auth middleware here, open to all
router.post('/login', loginUser);

module.exports = router;
