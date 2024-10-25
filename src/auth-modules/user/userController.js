const User = require('./userSchema');
const userService = require('./userService');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const { username, email, password, address, phone, role, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user already exists
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with all fields
        const user = new User({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            role,
            userType: userType || 'Client'  // Default to 'Client' if userType is not provided
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedUser = await userService.updateUser(id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
