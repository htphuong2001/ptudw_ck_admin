require("dotenv").config();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const { sendLinkResetPassword } = require("../utils/mail");
const Admin = require("../models/Admin");
const cloudinary = require("../config/cloudinary");

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

const changePassword = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { password, newPassword } = req.body;
    const user = await Admin.findOne({ username, password: md5(password) });
    if (user) {
      await Admin.findOneAndUpdate(
        { username },
        { password: md5(newPassword) }
      );
      res.redirect("/auth/me");
    } else {
      res.render("admin/profile", {
        title: "Profile",
        info: "Change pass word not success",
      });
    }
  } catch (error) {
    next(error);
  }
};

const recoverPasswordPage = (req, res, next) => {
  res.render("pages/password-recover", {
    layout: false,
    title: "Recover password",
  });
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
      const token = generator.generate({
        length: 20,
        numbers: true,
      });
      const link = `${req.get("origin")}/auth/password-reset/${
        user._id
      }/${token}`;
      await Promise.all([
        Admin.findOneAndUpdate({ email }, { token }),
        sendLinkResetPassword(email, link),
      ]);

      setTimeout(async () => {
        try {
          Admin.findOneAndUpdate({ email }, { token: null });
        } catch (error) {
          next(error);
        }
      }, 5000 * 60);

      res.locals.notification = "Check your email";
    } else {
      res.locals.notification = "Email is not correct";
    }

    res.render("pages/password-recover", {
      layout: false,
      title: "Forgot password",
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordPage = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await Admin.findOne({ _id: userId, token });
    if (user) {
      res.render("pages/password-reset", {
        layout: false,
        title: "Reset password",
        userId,
        token,
      });
    }
    next(createError.NotFound());
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password, passwordAgain } = req.body;
    if (password != passwordAgain) {
      res.render("pages/password-reset", {
        layout: false,
        title: "Reset password",
        notification: "Password does not match",
        userId,
        token,
      });
    } else {
      const user = await Admin.findOne({ _id: userId, token });
      if (user) {
        await Admin.findByIdAndUpdate(userId, {
          password: md5(password),
          token: null,
        });
        res.redirect("/");
      } else {
        res.render("pages/password-reset", {
          layout: false,
          title: "Reset password",
          notification: "Token expired",
          userId,
          token,
        });
      }
    }
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
  changePassword,
  recoverPasswordPage,
  recoverPassword,
  resetPasswordPage,
  resetPassword,
};
