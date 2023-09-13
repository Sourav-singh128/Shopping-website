const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  product: String,
  img: String,
  amount: Number,
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
