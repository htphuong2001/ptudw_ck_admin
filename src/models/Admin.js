const mongoose = require("mongoose");
const md5 = require("md5");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  fullname: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "sa"],
    default: "admin",
  },
  avatar: {
    type: String,
    default: null,
  },
  avatar_id: {
    type: String,
    default: null,
  },
  is_lock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) return next();

    user.password = md5(user.password);
    next();
  } catch {
    next(err);
  }
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
