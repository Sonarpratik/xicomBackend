const Product = require('./productSchema');
const { getProduct } = require('./utils/helper');

exports.createProduct = async (data) => {


  const product = new Product(data);
  
  
  return await product.save();

  
  };

  exports.getAllProducts = async ({ query }) => {
    try {
      // Destructure and set default values for page and limit
      const { page = 1, limit = 12 ,...filter} = query;
      
      // Parse page and limit as integers
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum; // Calculate skip value for pagination
      
      console.log("Query parameters:", filter); // Debugging: log query parameters
  
      const products = await Product.aggregate([
        { 
          $match: { 
            active: true,                        
            ...filter                              // Additional filters
          }
        },
        { 
          $group: {                               
            _id: { 
              name: "$name",
              category: "$category",
              material: "$material",
              mainCategory: "$mainCategory"
            },
            doc: { $first: "$$ROOT" }             
          }
        },
        { 
          $replaceRoot: { newRoot: "$doc" }       
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: skip },                   
              { $limit: limitNum }               
            ],
            totalCount: [
              { $count: "count" }                
            ]
          }
        }
      ]);
  
      const paginatedResults = products[0]?.paginatedResults || [];
      const totalCount = products[0]?.totalCount[0]?.count || 0;
  
      return {
        products: paginatedResults,
        totalCount,
        page: pageNum,
        limit: limitNum
      };
    } catch (error) {
      console.error("Error fetching paginated active products with total count:", error);
      throw error;
    }
  };
  
  
  
exports.getAllProductsAdmin = async () => {
    return await Product.find().populate('category');
};

exports.getProductById = async (id) => {

  const data = await Product.findById(id)
  .populate('category', 'name _id type'); // Only select name, _id, and type from the category

    const products = await Product.find({ name: data?.name,material:data?.material,category:data?.category?._id.toString(),active:true});
    const struct=await {
      originalColor:data.color,
      ...data.toObject()
    }

    console.log(data)
    console.log(struct);
    const result = getProduct(struct, products);
    return await {products:[...products],colors:{...result}};
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
