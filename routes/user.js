// Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");

// Routing Component
const router = express.Router();

const { verify, verifyAdmin } = auth;

// Route for user registration
router.post("/register", (req, res) => {
  userController
    .registerUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// Route for user Authentication
router.post("/login", userController.loginUser);

// Route for creating order (autheticated user only)
router.post("/orders", verify, userController.createOrder);

// Route for retrieve user details
router.get("/:userId/userDetails", verify, userController.getProfile);

// Streach goals

// Route for retrieving all orders (user only)
router.get("/orders", verify, userController.order);

// Route for retrieving all orders (admin only)
router.get("/myOrders", verify, verifyAdmin, userController.getProfile);

// Route for setting user to admin
router.put(
  "/:userId/setAsAdmin",
  verify,
  verifyAdmin,
  userController.updateAdmin
);

// Export Route System
module.exports = router;
