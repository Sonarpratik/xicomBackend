const Category = require("./categorySchema");

exports.createCategory = async (data) => {
  const category = new Category(data);
  
    return await category.save();

};
exports.getAllCategorys = async () => {
  return await Category.find();
};

exports.getCategoryById = async (id) => {
  const data = await Category.findById(id);

  return await data;
};

exports.updateCategory = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};
