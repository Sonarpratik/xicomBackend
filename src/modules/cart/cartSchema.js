const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../auth-modules/user/userSchema");
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
  custom: {
    text: { type: String },
    font: { type: String },
    color: { type: String },
    patch: { type: String },
    price: { type: Number },
  },
});

const userCart = mongoose.model("CART", userCartSchema);
module.exports = userCart;
