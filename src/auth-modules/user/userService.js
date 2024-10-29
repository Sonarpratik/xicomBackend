//userService.js
const User = require('./userSchema');
const bcrypt = require('bcrypt');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email }).populate('role');
};

exports.getAllUsers = async (filters) => {
    const query = {};

    if (filters.search) {
        query.$or = [
            { username: new RegExp(filters.search, 'i') },
            { email: new RegExp(filters.search, 'i') }
        ];
    }

    if (filters.role) {
        query.role = filters.role;
    }

    if (filters.userType) {
        query.userType = filters.userType;
    }

    return await User.find(query, '-password').populate('role');
};

exports.findUserById = async (id) => {
    return await User.findById(id).select('-password').populate('role'); // Exclude password from the result
};

exports.updateUser = async (id, updateData) => {
    if (updateData.password) {
        // If password is being updated, hash it first
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
