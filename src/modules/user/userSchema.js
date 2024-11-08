const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  residentialAddressStreet1:{ type: String, required: true },
  residentialAddressStreet2:{ type: String, required: true },
  permanentAddressStreet1:{ type: String, default: ""},
  permanentAddressStreet2:{ type: String, default: ""},

  addressSame: { type: Boolean, default: false },
  files: [
    {
      fileName: { type: String, required: true },
      typeOfFile: { type: String, required: true },
      document: { type: String, required: true },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
