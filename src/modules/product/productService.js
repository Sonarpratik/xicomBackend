const Product = require('./productSchema');
const { getProduct } = require('./utils/helper');

exports.createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

exports.getAllProducts = async ({query}) => {
    
    try {
        const products = await Product.aggregate([
          { $match: { active: true ,...query} },        // Filter only active products
          { $group: {                           // Group by the `name` field
              _id: "$name",
              doc: { $first: "$$ROOT" }         // Use `$first` to get the first occurrence
            }
          },
          { $replaceRoot: { newRoot: "$doc" } } // Replace the root to simplify the output
        ]);
    
        return products;
      } catch (error) {
        console.error("Error fetching unique active products:", error);
      }
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
