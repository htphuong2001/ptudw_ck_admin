const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

const AuthController = require("../controllers/auth");

router.route("/login").get(AuthController.loginPage).post(AuthController.login);

router.route("/logout").get(auth.checkLogin, AuthController.logout);

router
  .route("/me")
  .get(auth.checkLogin, AuthController.getProfilePage)
  .post(auth.checkLogin, upload.single("avatar"), AuthController.updateProfile);

router
  .route("/change-password")
  .post(auth.checkLogin, AuthController.changePassword);

router
  .route("/password-reset")
  .get(AuthController.recoverPasswordPage)
  .post(AuthController.recoverPassword);

router
  .route("/password-reset/:userId/:token")
  .get(AuthController.resetPasswordPage)
  .post(AuthController.resetPassword);

module.exports = router;
