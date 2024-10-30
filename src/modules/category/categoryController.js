const categoryService = require('./categoryService');

exports.createCategory = async (req, res) => {
    try {
        const role = await categoryService.createCategory(req.body);
        res.status(201).json(role);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({
                message: 'A category with the same name already exists.',
                details: error.keyValue // This will show the duplicate fields
            });
        }
        // Handle other errors
        console.error('Error creating category:', error); // Log the error for debugging
        res.status(500).json({ message: 'An unexpected error occurred.', error });

    }
};

exports.getAllCategorys = async (req, res) => {
    try {
        const roles = await categoryService.getAllCategorys();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const role = await categoryService.getCategoryById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const role = await categoryService.updateCategory(req.params.id, req.body);
        if (!role) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const role = await categoryService.deleteCategory(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
