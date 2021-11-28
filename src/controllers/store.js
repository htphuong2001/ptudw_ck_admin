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

const deleteCategory = async (req, res, next) => {
  const { _id } = req.query;
  try {
    await CategoryModel.findByIdAndDelete({ _id });
    res.redirect("/store/category");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  takeCategory,
  addCategoryPage,
  addCategory,
  deleteCategory,
};
