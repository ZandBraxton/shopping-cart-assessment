const express = require("express");

const ItemSchema = new Schema(
  {
    productId: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema({
  items: [ItemSchema],
  subTotal: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
