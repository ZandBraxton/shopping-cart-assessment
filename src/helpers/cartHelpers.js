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
  let val = cart.items.reduce(
    (acc = {}, item = {}) => {
      const itemTotal = parseFloat((item.price * item.quantity).toFixed(2));
      acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));

      return acc;
    },
    {
      subtotal: 0,
    }
  );
  return (cart.subTotal = val.subtotal.toLocaleString("en", {
    useGrouping: false,
    minimumFractionDigits: 2,
  }));
}

module.exports = { findCart, createCart, calculateSubTotal };
