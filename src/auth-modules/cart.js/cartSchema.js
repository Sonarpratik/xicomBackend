const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userSchema");
const Product = require("../product/productSchema");

const userCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
  quantity: { type: Number, default: 1 },
  size: { type: String, required: true },
});

const userCart = mongoose.model("CART", userCartSchema);
module.exports = userCart;
