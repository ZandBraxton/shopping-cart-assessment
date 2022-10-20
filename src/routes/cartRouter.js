const express = require("express");
const {
  addToCart,
  getCart,
  deleteFromCart,
  checkoutCart,
  updateCart,
} = require("../controllers/cartController");

const cartRouter = express.Router();

//check auth on all

//get cart
cartRouter.get("/", getCart);

//add to cart
cartRouter.post("/add", addToCart);

//delete from cart
cartRouter.delete("/delete/:productId", deleteFromCart);

//update quantity of cart
cartRouter.put("/update", updateCart);

//checkout
cartRouter.post("/checkout", checkoutCart);

module.exports = { cartRouter };
