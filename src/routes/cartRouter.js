const express = require("express");
const { addToCart, getCart } = require("../controllers/cartcontroller");

const cartRouter = express.Router();

// router.get("/", controller.getCart);
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);

module.exports = { cartRouter };
