const mongoose = require("mongoose");
const UserRole = require("../user-role/userRoleSchema");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
 
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    info: {
      shipping: {
        address: {
          type: String,
        },
        phone: {
          type: String,
        },
        landmark: {
          type: String,
        },
        pincode: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },

        country: {
          type: String,
        },
      },
      billing: {
        address: {
            type: String,
          },
          phone: {
            type: String,
          },
          landmark: {
            type: String,
          },
          pincode: {
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
  
          country: {
            type: String,
          },
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserRole,
      // required: true,
    },
    userType: {
      type: String,
      enum: ["Client", "System"],
      required: true,
      default: "Client", // Default user type is 'Client'
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
