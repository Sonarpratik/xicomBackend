const UserRole = require('./userRoleSchema');

exports.createUserRole = async (roleData) => {
    const userRole = new UserRole(roleData);
    return await userRole.save();
};

exports.getAllUserRoles = async () => {
    return await UserRole.find();
};

exports.getUserRoleById = async (id) => {
    return await UserRole.findById(id);
};

exports.updateUserRole = async (id, updateData) => {
    return await UserRole.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteUserRole = async (id) => {
    return await UserRole.findByIdAndDelete(id);
};
