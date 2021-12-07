const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");

router.route("/login").get(AuthController.loginPage).post(AuthController.login);

module.exports = router;
