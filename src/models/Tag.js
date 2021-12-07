const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    default: null,
    type: String,
    ref: "Category",
  },
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
