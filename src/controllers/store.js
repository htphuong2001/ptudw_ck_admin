const CategoryModel = require("../models/Category");

const addCategory = async (req, res, next) => {
  const category = req.body;
  try {
    console.log(category);
    await CategoryModel.create(category);
    res.redirect("/store/category");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCategory,
};
