const userRoleService = require('./userRoleService');

exports.createUserRole = async (req, res) => {
    try {
        const role = await userRoleService.createUserRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllUserRoles = async (req, res) => {
    try {
        const roles = await userRoleService.getAllUserRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getUserRoleById = async (req, res) => {
    try {
        const role = await userRoleService.getUserRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'UserRole not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const role = await userRoleService.updateUserRole(req.params.id, req.body);
        if (!role) {
            return res.status(404).json({ message: 'UserRole not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteUserRole = async (req, res) => {
    try {
        const role = await userRoleService.deleteUserRole(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'UserRole not found' });
        }
        res.status(200).json({ message: 'UserRole deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
