//userRoutes.js
const express = require('express');
const { 
    registerUser, 
    getAllUsers,
    getUserById, 
    updateUser, 
    deleteUser  
} = require('./userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
