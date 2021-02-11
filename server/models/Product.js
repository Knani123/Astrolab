const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  descriptions: { type: String, required: true },
  image: { type: String, required: false },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  assignedTo: { type: mongoose.Types.ObjectId, ref: "wish" },
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  create_date: { type: Date, default: Date.now },
});

module.exports = Product = mongoose.model("product", ProductSchema);
