const mongoose = require("mongoose");
const Category = require("../category/categorySchema"); // Assuming this is your Category model

// Define the Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    material: { type: String,  required: true },
    mainCategory: { type: String,  required: true },

    type: { type: String,  required: true },

    color: { type: String, },
    size: { type: String,  },
    brand: { type: String, lowercase: true },
    piping: { type: String, lowercase: true },
    closure: { type: String, lowercase: true },
    special: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    inventoryCount: { type: Number, default: 0 },
    instock: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/IoOvviQ4di6rWn-a5_3PxljCQRXg5AQco4id07WyC3o/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by1tb2Rl/cm4tbHV4dXJ5LWFy/bS1jaGFpci1mdXJu/aXR1cmUtZGVzaWdu/Xzc2MzExMS0yMjEx/Ni5qcGc_c2l6ZT02/MjYmZXh0PWpwZw",
    },
    multi_img: [{ type: String }],
    seoArray: [{ type: String }],
    description: { type: String },
    price: { type: Number, required: true, set: (v) => Math.ceil(v) },
    discount: { type: Number, default: 0, set: (v) => Math.ceil(v) },
    moreFeatures: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Enables createdAt and updatedAt timestamps
  }
);

// `pre-save` hook to prevent duplicate products with the same name, category, material, color, and size
ProductSchema.pre("save", async function (next) {
  try {
    const product = this;
    // If the product is new, we proceed with checking
    if (product.isNew) {
      // Query for existing products with the same combination of fields
      const existingProduct = await mongoose.models.Product.findOne({
        name: product.name,
        category: product.category,
        material: product.material,
        color: product.color,
        size: product.size,
      });

      if (existingProduct) {
    
          return next(new Error("A product with the same combination already exists."));
        
      }
    }

    // Continue saving the product if no duplicates found
    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    return next(error); // Pass the error to the next handler
  }
});

// Create the model based on the schema
const Product = mongoose.model("Product", ProductSchema);

// Export the model
module.exports = Product;
