const express = require('express');
const {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('./categoryController');

const router = express.Router();

router.post('/', createCategory);

router.get('/', getAllCategorys);

router.get('/:id', getCategoryById);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
