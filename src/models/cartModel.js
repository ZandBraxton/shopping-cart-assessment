const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    productId: { type: String },
    name: { type: String },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: String, required: true },
    total: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema({
  items: [ItemSchema],
  subTotal: {
    type: String,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
