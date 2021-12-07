const Tag = require("../models/Tag");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const indexPage = (req, res, next) => {
  res.render("product/index", { title: "Product" });
};

const getProducts = async (req, res, next) => {
  try {
    const { draw, columns, order, start, length } = req.body;
    const nameColSort = columns[order[0].column].data;

    const recordsTotal = await Product.find({})
      .populate("tags", "name")
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

const newProductPage = async (req, res, next) => {
  try {
    const tags = await Tag.find({}).populate("category", "name");
    res.render("product/new", { title: "Product", tags });
  } catch (error) {
    next(error);
  }
};

const newProduct = async (req, res, next) => {
  try {
    const product = req.body;
    if (req.file) {
      product.img = req.file.path;
      product.img_id = req.file.filename;
    }
    console.log(product);
    const newProduct = new Product(product);
    await newProduct.save();
    res.redirect("/product");
  } catch (error) {
    next(error);
  }
};

const updateProductPage = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const [tags, product] = await Promise.all([
      Tag.find({}).populate("category", "name"),
      Product.findById(productId),
    ]);
    res.render("product/edit", {
      title: "Product",
      tags,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productUpdate = req.body;
    const productOld = await Product.findById(productId);
    if (req.file) {
      productUpdate.img = req.file.path;
      productUpdate.img_id = req.file.filename;
      if (productOld.img_id) {
        await cloudinary.uploader.destroy(productOld.img_id);
      }
    }
    await Product.findByIdAndUpdate(productId, productUpdate);
    res.redirect("/product");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productDelete = await Product.findById(productId);
    await Product.findByIdAndDelete(productId);
    if (productDelete.img_id) {
      await cloudinary.uploader.destroy(productDelete.img_id);
    }
    res.redirect("/product");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  indexPage,
  getProducts,
  newProductPage,
  newProduct,
  updateProductPage,
  updateProduct,
  deleteProduct,
};
