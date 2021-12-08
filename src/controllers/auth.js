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

const logout = (req, res, next) => {
  res.clearCookie("jwt_token");
  res.redirect("/");
};

const getProfilePage = async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await Admin.findOne({ username });
    res.render("admin/profile", { title: "Profile", user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.user;
    const updateUser = req.body;
    if (req.file) {
      updateUser.avatar = req.file.path;
      updateUser.avatar_id = req.file.filename;
      if (req.user.img_id) {
        await cloudinary.uploader.destroy(req.user.img_id);
      }
    }
    await Admin.findOneAndUpdate({ username }, updateUser);
    res.redirect("/auth/me");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  getProfilePage,
  updateProfile,
};
