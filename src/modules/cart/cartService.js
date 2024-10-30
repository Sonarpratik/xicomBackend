const Cart = require("./cartSchema");

exports.createCart = async (data) => {
  const cart = new Cart(data);
  return await cart.save();
};

exports.getAllCarts = async () => {
  return await Cart.find();
};

exports.getCartByUserId = async (id) => {
  const data = await Cart.find({ user: id });

  return await data;
};

exports.updateCart = async (id, updateData) => {
  return await Cart.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCart = async (id) => {
  return await Cart.findByIdAndDelete(id);
};
