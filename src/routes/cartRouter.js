const express = require("express");
const {
  addToCart,
  getCart,
  deleteFromCart,
  checkoutCart,
} = require("../controllers/cartcontroller");

const cartRouter = express.Router();

//get cart
cartRouter.get("/", getCart);

//add to cart
cartRouter.post("/", addToCart);

//delete from cart
cartRouter.delete("/", deleteFromCart);

//checkout
cartRouter.post("/checkout", checkoutCart);

module.exports = { cartRouter };
