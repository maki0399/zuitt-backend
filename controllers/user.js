// Dependencies and Modules
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { Error } = require("mongoose");
const Product = require("../models/Product");

// Controllers for user registration
module.exports.registerUser = (reqBody) => {
  // Creates a new user object named "newUser" using the mongoose model "User"
  let newUser = new User({
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password, 10),
  });

  // Saves the created object to our database
  return newUser
    .save()
    .then((user) => {
      // User registration successful
      return true;
    })
    .catch((error) => {
      // User registration failed
      console.error(error);
      return false;
    });
};

// Controllers for user authentication
module.exports.loginUser = (req, res) => {
  return User.findOne({ email: req.body.email }).then((result) => {
    // Check if user does not exist
    if (result == null) {
      return res.send(false);
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        result.password
      );

      if (isPasswordCorrect) {
        return res.send({ access: auth.createAccessToken(result) });
      } else {
        return res.send(false);
      }
    }
  });
};

// For creating order(authenticated user only)
const orderProduct = async (userId, productId) => {
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!product) {
    throw new Error("Product not found");
  }

  const newOrder = { userId, orderId: productId };

  user.userOrder = user.userOrder || [];
  user.userOrder.push(newOrder);
  await user.save();

  product.userOrder = product.userOrder || [];
  product.userOrder.push(newOrder);
  await product.save();
};

module.exports.createOrder = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      return res.status(403).send("Action Forbidden");
    }

    // Ensure that req.body.productId is provided
    if (!req.body.productId) {
      return res.status(400).send("Product ID is required");
    }

    await orderProduct(req.user.id, req.body.productId);

    return res.status(201).send("Ordered Successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

// For retrieving (authenticated user)

module.exports.getProfile = (req, res) => {
  return User.findById(req.user.id)
    .then((result) => {
      result.password = "";

      return res.send(result);
    })
    .catch((error) => res.send(error));
};

//--- Stretch Goals ---

// For retrieving all orders(user only)

module.exports.order = (req, res) => {
  return User.findById(req.user.id)
    .then((result) => {
      if (req.user.isAdmin) {
        return res.send("Action Forbidden");
      } else return res.send(result);
    })
    .catch((error) => res.send(error));
};

// For retrieving all orders(Admin Only)

module.exports.myOrder = (req, res) => {
  return User.findById(req.user.id)
    .then((result) => {
      if (req.user.isAdmin) {
        return res.send("Action Forbidden");
      } else return res.send(result);
    })
    .catch((error) => res.send(error));
};

// For setting a user to admin

module.exports.updateAdmin = async (req, res) => {
  try {
    // Assuming 'userId' is sent in the request body or params
    const userId = req.body.userId;

    // Update the user with the new 'isAdmin' value
    const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated as Admin successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
