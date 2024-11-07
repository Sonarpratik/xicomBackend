const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  type: { type: String, required: true},
  mainCategory: { type: String, required: true, },
  name: { type: String, required: true, lowercase: true,unique: true },
  sizes: [{ type: String,  }],
  piping: [{ type: String,  }],
  closure: [{ type: String,  }],
  material: [{ type: String,  }],
});


const Category = mongoose.model("CATEGORY", categorySchema);
module.exports = Category;