require("dotenv").config();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const loginPage = (req, res) => {
  res.render("pages/login", {
    layout: false,
    title: "Login",
    notification: undefined,
  });
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Admin.findOne({
      username: username,
      password: md5(password),
    });

    if (!user) {
      res.render("pages/login", {
        layout: false,
        title: "Login",
        notification: "Incorrect username or password.",
      });
    } else {
      const data = {
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      };
      const accessToken = jwt.sign(data, process.env.JWT_SECRET);
      res.cookie("jwt_token", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginPage,
  login,
};
