const products = require("../data.json");

async function findProduct(id) {
  console.log(products);
  const product = await products.find((item) => item.productId === id);
  console.log(product);
  return product;
}

module.exports = { findProduct };
