const express = require('express');
const { 
    loginUser,
    verifyToken,
    googleLoginUser,
    loginAdmin
} = require('./userAuth');
const { body } = require('express-validator');

const router = express.Router();

router.post('/auth/login', 
    [
        body('email').notEmpty().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ], 
    loginUser
);
router.post('/auth/admin/login', 
    [
        body('email').notEmpty().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ], 
    loginAdmin
);
router.post('/auth/google/login', 
    [
        body('Gtoken').notEmpty().withMessage('Valid Gtoken is required'),
    ], 
    googleLoginUser
);

router.get('/auth/verify', verifyToken);

module.exports = router;
