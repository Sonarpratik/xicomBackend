const jwt = require('jsonwebtoken');
const User = require('../auth-modules/user/userSchema'); 

const permissionMiddleware = (modelName, action) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.id).populate('role'); 

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const permissions = user.role.permissions.find(permission => permission.modelName === modelName);

            if (!permissions || !permissions[action]) {
                return res.status(403).json({ message: 'Access denied' }); 
            }

            req.user = user;
            next(); 
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = permissionMiddleware;
