const User = require("./userSchema");

// exports.createUser = async (data) => {
//     console.log("lion")
//   const user = new User(data);
//   return await user.save();
// };

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserByUserId = async (id) => {
  const data = await User.find({ user: id });

  return await data;
};

exports.updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
