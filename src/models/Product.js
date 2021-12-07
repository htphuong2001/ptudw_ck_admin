const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dev: {
    type: String,
    trim: true,
  },
  release: {
    type: Date,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  tags: [
    {
      type: String,
      ref: "Tag",
    },
  ],
  img: {
    type: String,
    default: null,
  },
  img_id: {
    type: String,
    default: null,
  },
  des: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
