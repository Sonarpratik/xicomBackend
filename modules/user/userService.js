//userService.js
const User = require('./userSchema');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

exports.getAllUsers = async () => {
    return await User.find({}, '-password');
};
