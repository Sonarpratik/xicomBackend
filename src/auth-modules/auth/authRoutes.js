const express = require('express');
const { 
    loginUser,
    verifyToken
} = require('./userAuth');
const { body } = require('express-validator');

const router = express.Router();

router.post('/auth/login', 
    [
        body('username').notEmpty().withMessage('Valid username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ], 
    loginUser
);

router.get('/verify', verifyToken);

module.exports = router;
