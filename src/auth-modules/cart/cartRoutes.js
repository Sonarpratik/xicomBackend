const express = require('express');
const {
    createCart,
    getAllCarts,
    getCartById,
    updateCart,
    deleteCart,
} = require('./cartController');

const router = express.Router();

router.post('/', createCart);

router.get('/', getAllCarts);

router.get('/:id', getCartById);

router.put('/:id', updateCart);

router.delete('/:id', deleteCart);

module.exports = router;
