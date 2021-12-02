const express = require("express");
const {
  getCategoryPage,
  getCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const {
  getTagPage,
  getTag,
  addTagPage,
  addTag,
  updateTagPage,
  updateTag,
  deleteTag,
} = require("../controllers/tag");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/store/category");
});

// Category
router.get("/category", getCategoryPage);

router.post("/take-category", getCategory);

router.get("/add-category", addCategoryPage);

router.post("/add-category", addCategory);

router.get("/update-category/:categoryId", updateCategoryPage);

router.post("/update-category/:categoryId", updateCategory);

router.get("/delete-category/:categotyId", deleteCategory);

// Tag
router.get("/tag", getTagPage);

router.post("/take-tag", getTag);

router.get("/add-tag", addTagPage);

router.post("/add-tag", addTag);

router.get("/update-tag/:tagId", updateTagPage);

router.post("/update-tag/:tagId", updateTag);

router.get("/delete-tag/:tagId", deleteTag);

module.exports = router;
