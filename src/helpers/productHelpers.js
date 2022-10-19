const products = require("../data.json");

async function findProduct(id) {
  const product = await products.find((item) => item.productId === id);
  return product;
}

module.exports = { findProduct };
