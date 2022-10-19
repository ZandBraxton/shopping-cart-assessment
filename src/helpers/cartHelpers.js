const { Cart } = require("../models/cartModel");

async function findCart() {
  const cart = await Cart.find();
  console.log(cart);
  return cart[0];
}

async function addItem(cart) {
  const data = await Cart.create(cart);
  return data;
}

module.exports = { findCart, addItem };
