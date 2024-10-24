const Product = require('./productSchema');
const { getProduct } = require('./utils/helper');

exports.createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

exports.getAllProducts = async () => {
    return await Product.find({active: true});
};
exports.getAllProductsAdmin = async () => {
    return await Product.find();
};

exports.getProductById = async (id) => {

    const data = await Product.findById(id);
    const products = await Product.find({ name: data.name ,active:true});
    
    const result = getProduct(data, products);
    return await result;
};
exports.getProductByIdAdmin = async (id) => {

    const data = await Product.findById(id);
    
    return data;
};

exports.updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};
