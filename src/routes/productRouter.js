const express = require("express");
const {
  getProduct,
  getAllProducts,
} = require("../controllers/productController");

const productRouter = express.Router();

// router.get("/", controller.getCart);
productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProduct);

module.exports = { productRouter };
