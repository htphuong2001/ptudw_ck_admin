const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/category", { title: "category" });
});

module.exports = router;
