const express = require('express');
const {
    createUserRole,
    getAllUserRoles,
    getUserRoleById,
    updateUserRole,
    deleteUserRole,
} = require('./userRoleController');
const permissionMiddleware = require('../../middlewares/permissionsMiddleware');

const router = express.Router();

router.post('/', permissionMiddleware('USER-ROLE', 'write'), createUserRole);

router.get('/', permissionMiddleware('USER-ROLE', 'read'), getAllUserRoles);

router.get('/:id', permissionMiddleware('USER-ROLE', 'read'), getUserRoleById);

router.put('/:id', permissionMiddleware('USER-ROLE', 'update'), updateUserRole);

router.delete('/:id', permissionMiddleware('USER-ROLE', 'delete'), deleteUserRole);

module.exports = router;
