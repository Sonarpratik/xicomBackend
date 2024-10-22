const express = require('express');
const { 
    loginUser
} = require('./userAuth');
const { body } = require('express-validator');

const router = express.Router();

router.post('/login', 
    [
        body('username').notEmpty().withMessage('Valid username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ], 
    loginUser
);

module.exports = router;
