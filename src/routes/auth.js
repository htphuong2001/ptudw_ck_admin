const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

const AuthController = require("../controllers/auth");

router.route("/login").get(AuthController.loginPage).post(AuthController.login);

router.route("/logout").get(AuthController.logout);

router
  .route("/me")
  .get(auth.checkLogin, AuthController.getProfilePage)
  .post(auth.checkLogin, upload.single("avatar"), AuthController.updateProfile);

module.exports = router;
