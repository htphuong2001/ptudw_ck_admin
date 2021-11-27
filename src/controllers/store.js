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

module.exports = {
  takeCategory,
  addCategory,
};
