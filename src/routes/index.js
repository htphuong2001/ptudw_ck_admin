const express = require("express");

const IndexController = require("../controllers/index");

const router = express.Router();

router.route("/").get(IndexController.indexPage);

module.exports = router;
