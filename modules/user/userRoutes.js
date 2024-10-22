//userRoutes.js
const express = require('express');
const { 
    registerUser, 
    getAllUsers,
    getUserById, 
    updateUser, 
    deleteUser  
} = require('./userController');
const permissionMiddleware = require('../../middlewares/permissionsMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.get('', permissionMiddleware('USER', 'read'), getAllUsers);
router.get('/:id', permissionMiddleware('USER', 'read'), getUserById);
router.put('/:id', permissionMiddleware('USER', 'update'), updateUser);
router.delete('/:id', permissionMiddleware('USER', 'delete'), deleteUser);

module.exports = router;
