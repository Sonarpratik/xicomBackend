const mongoose = require('mongoose');

const ModelName = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    USER: "USER",
};

const PermissionsSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    write: {
        type: Boolean,
        default: false,
    },
    update: {
        type: Boolean,
        default: false,
    },
    delete: {
        type: Boolean,
        default: false,
    },
    special: {
        type: Boolean,
        default: false,
    }
}, { _id: false }); 

const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // enum: Object.values(ModelName), 
    },
    permissions: {
        type: [PermissionsSchema], 
        default: [],
    }
}, {
    timestamps: true, 
});

const UserRole = mongoose.model('UserRole', UserRoleSchema);

module.exports = UserRole;
