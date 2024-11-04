const Product = require('./productSchema');
const { getProduct } = require('./utils/helper');

exports.createProduct = async (data) => {
  const existProduct = await Product.findOne({category: data?.category,material: data?.material,color: data?.color,size: data?.size,type: data?.type,name: data?.name});
if(!existProduct){

  const product = new Product(data);
  
  
  return await product.save();
}else{
  return "Product is already created"
}
  
  };

exports.getAllProducts = async ({query}) => {
    
    try {
        const products = await Product.aggregate([
          { $match: { active: true ,...query} },        // Filter only active products
          { $group: {                           // Group by the `name` field
            _id: { 
                name: "$name",       // Group by `name`
                category: "$category",// Group by `category`
                material: "$material" // Group by `category`
            },
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

    const data = await Product.findById(id).populate('category');
    const products = await Product.find({ name: data?.name,material:data?.material,category:data?.category?._id.toString(),active:true});
    
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
