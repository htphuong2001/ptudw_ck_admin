const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  dev: {
    type: String,
  },
  release: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  des: {
    type: String,
  },
  tag: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", CategorySchema);

module.exports = Product;
