const mongoose = require("mongoose");
const TagModel = require("../models/Tag");
const CategoryModel = require("../models/Category");

const getTagPage = (req, res, next) => {
  res.render("pages/tag/tag", { title: "Tag" });
};

const getTag = async (req, res, next) => {
  try {
    const { draw, columns, order, start, length } = req.body;
    const nameColSort = columns[order[0].column].data;

    const recordsTotal = await TagModel.find({})
      .populate("category", "name")
      .sort({
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

const addTagPage = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({});
    res.render("pages/tag/add-tag", { title: "Add Tag", categories });
  } catch (err) {
    next(err);
  }
};

const addTag = async (req, res, next) => {
  try {
    const tag = req.body;
    tag.category = mongoose.Types.ObjectId(tag.category);
    const newTag = new TagModel(tag);
    await newTag.save();
    res.redirect("/store/tag");
  } catch (err) {
    next(err);
  }
};

const updateTagPage = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const [categories, tag] = await Promise.all([
      CategoryModel.find({}),
      TagModel.findById(tagId).populate("category", "_id"),
    ]);
    res.render("pages/tag/update-tag", {
      title: "Update Tag",
      categories,
      tag,
    });
  } catch (err) {
    next(err);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tagUpdate = req.body;
    await TagModel.findByIdAndUpdate(tagId, tagUpdate);
    res.redirect("/store/tag");
  } catch (err) {
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  const { tagId } = req.params;
  try {
    await TagModel.findByIdAndDelete({ _id: tagId });
    res.redirect("/store/tag");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTagPage,
  getTag,
  addTagPage,
  addTag,
  updateTagPage,
  updateTag,
  deleteTag,
};
