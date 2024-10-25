const mongoose = require('mongoose');
const UserRole = require('../user-role/userRoleSchema');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserRole,
        // required: true,
    },
    userType: {
        type: String,
        enum: ['Client', 'System'],
        required: true,
        default: 'Client',  // Default user type is 'Client'
    },
}, {
    timestamps: true, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
