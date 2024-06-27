const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {
    registerUser, 
    loginUser,
    deleteUser, 
    editUserByID
} = require('../controllers/users')

const authenticateToken = require('../middleware/auth');

// Register and login routes
router.post('/register', registerUser);

router.post('/login', loginUser);

// Add the deleteUser route
router.delete('/user/:userId', authenticateToken, deleteUser);
router.patch('/user/:userId', authenticateToken, editUserByID);

module.exports = router;
