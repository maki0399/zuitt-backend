// Dependencies and modules
const express = require("express");
const productController = require("../controllers/product")
const auth = require("../auth");

// Routing Component
const router = express.Router();

// To verify if admin
const { verify, verifyAdmin } = auth;

// Route for creating a new product (Admin only)
router.post("/", verify, verifyAdmin, productController.addProduct);

// Route for retrive all products
router.get("/all", productController.getAllProducts);

// Route for Retrieving all active courses
router.get("/products", productController.getAllActive);

// Route for Retriving Specific Product
router.get("/:productId", productController.getProduct);

// Route for Update Product information (Admin only)
router.put("/:productId", verify, verifyAdmin, productController.updateProduct)

// Route for Archieve Product(Soft delete, Admin only)
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

// Route for Activate Product(Soft delete, Admin only)
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)




// Export Route System
module.exports = router;