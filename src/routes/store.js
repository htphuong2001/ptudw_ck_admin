const express = require("express");
const { addCategory } = require("../controllers/store");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/store/category");
});

router.get("/category", (req, res, next) => {
  res.render("pages/category", { title: "category" });
});

router.post("/add-category", addCategory);

module.exports = router;
