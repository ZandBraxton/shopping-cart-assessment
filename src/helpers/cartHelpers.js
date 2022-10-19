const { Cart } = require("../models/cartModel");

async function findCart() {
  const cart = await Cart.find();
  return cart[0];
}

async function createCart(cart) {
  const data = await Cart.create(cart);
  return data;
}

async function calculateSubTotal(cart) {
  return (cart.subTotal = cart.items
    .map((item) => item.total)
    .reduce((acc, next) => acc + next));
}

module.exports = { findCart, createCart, calculateSubTotal };
