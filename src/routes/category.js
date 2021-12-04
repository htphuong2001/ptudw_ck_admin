const express = require("express");

const CategoryController = require("../controllers/category");

const router = express.Router();

router
  .route("/")
  .get(CategoryController.indexPage)
  .post(CategoryController.getCategories);

router
  .route("/add")
  .get(CategoryController.addCategoryPage)
  .post(CategoryController.addCategory);

router
  .route("/update/:categoryId")
  .get(CategoryController.updateCategoryPage)
  .post(CategoryController.updateCategory);

router.route("/delete/:categoryId").get(CategoryController.deleteCategory);

module.exports = router;
