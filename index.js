// Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Environment setup
const port = 4000;

// External Route
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

// Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongoose.connect(
  "mongodb+srv://basiliomarclaurence:admin123@cluster0.t70h8bq.mongodb.net/ecommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Terminal message if connected
mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);

// Backend Routes
app.use("/users", userRoutes);
app.use("/product", productRoutes);

// Server Gateway Response
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API is now online on port ${port}`);
  });
}

module.exports = { app, mongoose };
