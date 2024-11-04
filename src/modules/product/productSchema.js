const mongoose = require("mongoose");
const Category = require("../category/categorySchema");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,lowercase: true },
    type: { type: String, lowercase: true ,required: true},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    material: { type: String,lowercase: true,required: true },
    
    color: { type: String ,lowercase: true},
    size: { type: String,lowercase: true },
    

    brand: { type: String, lowercase: true },
    special: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },

    inventoryCount: { type: Number, default: true },
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
    timestamps: true,
  }
);
ProductSchema.index({ name: 1, category: 1, material: 1, color: 1, size: 1 }, { unique: true });
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;