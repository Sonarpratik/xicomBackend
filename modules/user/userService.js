//userService.js
const User = require('./userSchema');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.getAllUsers = async () => {
    return await User.find({}, '-password'); 
};
