const productService = require('./productService');

exports.createProduct = async (req, res) => {


    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
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

exports.getAllProducts = async (req, res) => {
    try {
        let products=[]
        console.log(req.user)
        if(req.user?.userType==="System"){

            products = await productService.getAllProductsAdmin();
        }else{
            products = await productService.getAllProducts({query:req.query});

        }
      
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllProductsAdmin = async (req, res) => {
    try {
        const products = await productService.getAllProductsAdmin();
      
      
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        let product={}
        if(req.user?.userType==="System"){

            product = await productService.getProductByIdAdmin(req.params.id);
        }else{
            product = await productService.getProductById(req.params.id);

        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
