const mongoose = require("mongoose");

const Category = require("../models/Category");
const Tag = require("../models/Tag");

const indexPage = (req, res, next) => {
  res.render("tag/index", { title: "Tag" });
};

const getTags = async (req, res, next) => {
  try {
    const { draw, columns, order, start, length } = req.body;
    const nameColSort = columns[order[0].column].data;

    const recordsTotal = await Tag.find({})
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
  } catch (error) {
    next(error);
  }
};

const newTagPage = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.render("tag/new", { title: "Tag", categories });
  } catch (error) {
    next(error);
  }
};

const newTag = async (req, res, next) => {
  try {
    const tag = req.body;
    console.log(tag);
    const newTag = new Tag(tag);
    await newTag.save();

    res.redirect("/tag");
  } catch (error) {
    next(error);
  }
};

const updateTagPage = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const [categories, tag] = await Promise.all([
      Category.find({}),
      Tag.findById(tagId),
    ]);

    res.render("tag/edit", {
      title: "Tag",
      categories,
      tag,
    });
  } catch (error) {
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tagUpdate = req.body;
    await Tag.findByIdAndUpdate(tagId, tagUpdate);
    res.redirect("/tag");
  } catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    await Tag.findByIdAndDelete({ _id: tagId });
    res.redirect("/tag");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  indexPage,
  getTags,
  newTagPage,
  newTag,
  updateTagPage,
  updateTag,
  deleteTag,
};
