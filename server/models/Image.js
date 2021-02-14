const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imageName: String,
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  create_date: { type: Date, default: Date.now },
});

module.exports = Image = mongoose.model("image", ImageSchema);
