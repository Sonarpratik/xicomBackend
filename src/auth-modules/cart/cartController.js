const cartService = require('./cartService');

exports.createCart = async (req, res) => {
    try {
        const role = await cartService.createCart(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const roles = await cartService.getAllCarts();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const role = await cartService.getCartByUserId(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const role = await cartService.updateCart(req.params.id, req.body);
        if (!role) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const role = await cartService.deleteCart(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
