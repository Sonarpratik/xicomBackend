const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProductsAdmin,
    getProductByIdAdmin,
} = require('./productController');
const permissionMiddleware = require('../../middlewares/permissionsMiddleware');

const router = express.Router();

router.post('/',  createProduct);

router.get('/', getAllProducts);
router.get('/admin/', getAllProductsAdmin);

router.get('/:id',  getProductById);
router.get('/admin/:id',  getProductByIdAdmin);

router.put('/:id',  updateProduct);

router.delete('/:id',  deleteProduct);

module.exports = router;
