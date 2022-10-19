const express = require("express");
const {
  getProduct,
  getAllProducts,
} = require("../controllers/productController");

const productRouter = express.Router();

//get all products
productRouter.get("/", getAllProducts);

//get product
productRouter.get("/:productId", getProduct);

module.exports = { productRouter };
