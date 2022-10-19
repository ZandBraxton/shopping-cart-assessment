const express = require("express");
const {
  addToCart,
  getCart,
  deleteFromCart,
} = require("../controllers/cartcontroller");

const cartRouter = express.Router();

// router.get("/", controller.getCart);
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/", deleteFromCart);

module.exports = { cartRouter };
