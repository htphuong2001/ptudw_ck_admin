const express = require("express");
const {
  takeCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
} = require("../controllers/store");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/store/category");
});

router.get("/category", (req, res, next) => {
  res.render("pages/category", { title: "category" });
});

router.get("/update-category/:categoryId", updateCategoryPage);

router.post("/update-category/:categoryId", updateCategory);

router.get("/take-category", takeCategory);

router.get("/add-category", addCategoryPage);

router.post("/add-category", addCategory);

router.get("/delete-category/:categotyId", deleteCategory);

module.exports = router;
