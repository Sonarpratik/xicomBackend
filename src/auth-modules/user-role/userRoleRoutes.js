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

router.post('/', createUserRole);

router.get('/', getAllUserRoles);

router.get('/:id', getUserRoleById);

router.put('/:id', updateUserRole);

router.delete('/:id', deleteUserRole);

module.exports = router;
