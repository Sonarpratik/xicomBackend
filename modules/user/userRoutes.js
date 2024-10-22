//userRoutes.js
const express = require('express');
const { 
    registerUser, 
    getAllUsers 
} = require('./userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('', getAllUsers);

module.exports = router;
