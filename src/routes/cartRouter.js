const express = require("express");

const router = express.Router();

router.get("/", controller.getCart);
router.post("/", cartController.addToCart);

module.exports = { router };
