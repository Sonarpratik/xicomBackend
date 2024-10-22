//userSchema.js
const mongoose = require('mongoose');
const UserRole = require('../user-role/userRoleSchema');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserRole,
        required: true,
    },
}, {
    timestamps: true, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
