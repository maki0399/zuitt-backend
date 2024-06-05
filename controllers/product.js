// Dependencies and Modules
const Product = require("../models/Product");

// Create new product
module.exports.addProduct = (req, res) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  return newProduct
    .save()
    .then((product, error) => {
      if (error) {
        return res.send(false);
      } else {
        return res.send(true);
      }
    })
    .catch((err) => res.send(err));
};

// Retrive Product
module.exports.getAllProducts = (req, res) => {
  return Product.find({}).then((result) => {
    return res.send(result);
  });
};

// Retrive All active product
module.exports.getAllActive = (req, res) => {
  return Product.find({ isActive: true }).then((result) => {
    return res.send(result);
  });
};

// Retrive Specific Product
module.exports.getProduct = (req, res) => {
  return Product.findById(req.params.productId).then((result) => {
    return res.send(result);
  });
};

// Update Product information (Admin only)
module.exports.updateProduct = (req, res) => {
  let updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then(
    (result, error) => {
      if (error) {
        return res.send(false);
      } else {
        return res.send(true);
      }
    }
  );
};

// Archieve Product (Soft delete, Admin only)
module.exports.archiveProduct = (req, res) => {
  let updateArchivedProduct = {
    isActive: false,
  };

  return Product.findByIdAndUpdate(req.params.productId, updateArchivedProduct)
    .then((result, error) => {
      if (error || !result) {
        return res.send(false);
      } else {
        return res.send(true);
      }
    })
    .catch((err) => res.send(err));
};

// Activate a Product (Admin Only)
module.exports.activateProduct = (req, res) => {
  let updateActiveField = {
    // isActive: true,
    isActive: true,
  };

  return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((course, error) => {
      if (error) {
        return res.send(false);
      } else {
        return res.send(true);
      }
    })
    .catch((err) => res.send(err));
};
