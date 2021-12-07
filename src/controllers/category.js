const Category = require("../models//Category");

const indexPage = (req, res, next) => {
  res.render("category/index", { title: "Category" });
};

const getCategories = async (req, res, next) => {
  try {
    const { draw, columns, order, start, length } = req.body;
    const nameColSort = columns[order[0].column].data;

    const recordsTotal = await Category.find({}).sort({
      [nameColSort]: order[0].dir,
    });
    const data = recordsTotal.slice(start, start + length);

    res.json({
      raw: draw + 1,
      recordsTotal: recordsTotal.length,
      recordsFiltered: recordsTotal.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const newCategoryPage = (req, res, next) => {
  res.render("category/new", { title: "Category" });
};

const newCategory = async (req, res, next) => {
  try {
    const category = req.body;
    await Category.create(category);
    res.redirect("/category");
  } catch (error) {
    next(error);
  }
};

const updateCategoryPage = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);
    const category = await Category.findById(categoryId);
    console.log(category);
    res.render("category/edit", {
      title: "Category",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryUpdate = req.body;
    await Category.findByIdAndUpdate(categoryId, categoryUpdate);
    res.redirect("/category");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete({ _id: categoryId });
    res.redirect("/category");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  indexPage,
  getCategories,
  newCategoryPage,
  newCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
