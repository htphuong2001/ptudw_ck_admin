require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const checkLogin = async (req, res, next) => {
  try {
    const token = req.cookies["jwt_token"];
    if (!token) return res.redirect("/auth/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ username: decoded.username });
    if (user) {
      res.locals.user = req.user = user;
      next();
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkLogin };
