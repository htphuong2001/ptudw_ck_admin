const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.route("/").get(UserController.indexPage);

module.exports = router;
