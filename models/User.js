// // Dependencies and Modules
// const mongoose = require("mongoose");

// // Schema
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     require: [true, "Email is required!"],
//   },

//   mobileNo: {
//     type: String,
//     require: [true, "Mobile Number is required!"],
//   },

//   password: {
//     type: String,
//     required: [true, "Password id required"],
//   },

//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },

//   userOrder: [
//     {
//       userId: {
//         type: String,
//         required: [true, "User ID is required"],
//       },

//       orderId: {
//         type: String,
//         required: [true, "order Id is required"],
//       },
//     },
//   ],
// });

// // Model
// module.exports = mongoose.model("User", userSchema);
// Dependencies and Modules
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },

  mobileNo: {
    type: String,
    required: [true, "Mobile Number is required!"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  userOrder: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
        required: [true, "User ID is required"],
      },

      orderId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
        required: [true, "Order ID is required"],
      },
    },
  ],
});

// Model
module.exports = mongoose.model("User", userSchema);
