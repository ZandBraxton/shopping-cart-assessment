const express = require("express");
const {
  findCart,
  createCart,
  calculateSubTotal,
} = require("../helpers/cartHelpers");
const { findProduct } = require("../helpers/productHelpers");
const { Cart } = require("../models/cartModel");

async function getCart(req, res, next) {
  const cart = await findCart();
  if (!cart) {
    return res.status(400).json({
      type: "invalid",
      message: "Cart not found",
    });
  }

  return res.status(200).json({
    type: "success",
    data: cart,
  });
}

async function addToCart(req, res, next) {
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await findCart();
  const product = await findProduct(productId);

  //if dealing with out of stock product
  if (!product) {
    return res.status(500).json({
      type: "Not Found",
      message: "Invalid request",
    });
  }

  if (cart) {
    //check for item in cart
    const index = cart.items.findIndex((item) => item.productId === productId);

    //if item isn't found, push to cart
    if (index === -1) {
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: product.price,
        total: product.price * quantity,
      });

      //if found, update quantity
    } else {
      cart.items[index].quantity = cart.items[index].quantity + quantity;
      cart.items[index].total = cart.items[index].quantity * product.price;
      cart.items[index].price = product.price;
    }
    //calculate subtotal
    await calculateSubTotal(cart);

    const data = await cart.save();
    res.status(200).json({
      type: "success",
      message: "Data Updated Successfully",
      data: data,
    });
  } else {
    //new cart
    const newCart = {
      items: [
        {
          productId: productId,
          quantity: quantity,
          price: product.price,
          total: product.price * quantity,
        },
      ],
      subTotal: product.price * quantity,
    };

    const data = await createCart(newCart);
    res.json(data);
  }
}

async function deleteFromCart(req, res, next) {
  const cart = await findCart();
  const productId = req.body.productId;
  if (cart) {
    cart.items = cart.items.filter((item) => item.productId !== productId);
    if (!cart.items.length) {
      //empty cart
      cart.subTotal = 0;
    } else {
      await calculateSubTotal(cart);
    }
    const data = await cart.save();

    return res.status(200).json({
      type: "success",
      data: data,
    });
  }
}

async function checkoutCart(req, res, next) {
  const cart = await findCart();
  if (cart) {
    cart.items = [];
    cart.subTotal = 0;
    const data = await cart.save();

    return res.status(200).json({
      type: "success",
      data: data,
    });
  }
}

module.exports = { addToCart, getCart, deleteFromCart, checkoutCart };
