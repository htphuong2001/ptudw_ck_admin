const express = require("express");

const OrderController = require("../controllers/order");

const router = express.Router();

router.route("/").get(OrderController.indexPage);

module.exports = router;
