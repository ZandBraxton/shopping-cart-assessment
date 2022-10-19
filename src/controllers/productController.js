const { findProduct } = require("../helpers/productHelpers");
const products = require("../data.json");

async function getProduct(req, res, next) {
  const productId = req.params.productId;

  const product = await findProduct(productId);

  if (!product) {
    return res.status(500).json({
      type: "Not Found",
      message: "Invalid request",
    });
  }

  return res.status(200).json(product);
}

async function getAllProducts(req, res, next) {
  return res.status(200).json(products);
}

module.exports = { getProduct, getAllProducts };
