const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  type: { type: String, required: true, lowercase: true },
  category: { type: String, required: true, lowercase: true,unique: true },
  sizes: [{ type: String,  lowercase: true }],
  piping: [{ type: String,  lowercase: true }],
  closure: [{ type: String,  lowercase: true }],
});

const Category = mongoose.model("CATEGORY", categorySchema);
module.exports = Category;