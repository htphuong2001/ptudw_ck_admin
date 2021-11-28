const CategoryModel = require("../models/Category");

const takeCategory = async (req, res, next) => {
  const { draw, columns, order, start, length } = req.query;
  const nameColSort = columns[order[0].column].data;
  console.log(nameColSort);
  try {
    const recordsTotal = await CategoryModel.find({}).sort({
      [nameColSort]: order[0].dir,
    });
    const data = recordsTotal.slice(start, start + length);
    res.json({
      raw: draw + 1,
      recordsTotal: recordsTotal.length,
      recordsFiltered: recordsTotal.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

const addCategoryPage = (req, res, next) => {
  res.render("pages/add-category", { title: "Add Category" });
};

const addCategory = async (req, res, next) => {
  const category = req.body;
  try {
    await CategoryModel.create(category);
    res.redirect("/store/category");
  } catch (err) {
    next(err);
  }
};

const updateCategoryPage = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const category = await CategoryModel.findById(categoryId);
    res.render("pages/update-category", {
      title: "Update category",
      category,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const categoryUpdate = req.body;
  console.log(categoryUpdate);
  try {
    await CategoryModel.findByIdAndUpdate(categoryId, categoryUpdate);
    res.redirect("/store/category");
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    await CategoryModel.findByIdAndDelete({ _id: categoryId });
    res.redirect("/store/category");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  takeCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
