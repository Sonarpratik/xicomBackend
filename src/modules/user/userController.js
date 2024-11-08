const userService = require('./userService');

// exports.createUser = async (req, res) => {
//     try {
//         const role = await userService.createUser(req.body);
//         res.status(201).json(role);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

exports.getAllUsers = async (req, res) => {
    try {
        const roles = await userService.getAllUsers();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const role = await userService.getUserByUserId(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const role = await userService.updateUser(req.params.id, req.body);
        if (!role) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const role = await userService.deleteUser(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
