const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile} = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', verifyToken, loginUser)
router.get('/profile', verifyToken, getProfile)

module.exports = router