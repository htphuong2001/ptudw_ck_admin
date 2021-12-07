const express = require("express");

const ProductController = require("../controllers/product");
const upload = require("../middlewares/upload");
const Product = require("../models/Product");

const router = express.Router();

router
  .route("/")
  .get(ProductController.indexPage)
  .post(ProductController.getProducts);

router
  .route("/new")
  .get(ProductController.newProductPage)
  .post(upload.single("img"), ProductController.newProduct);

router
  .route("/update/:productId")
  .get(ProductController.updateProductPage)
  .post(upload.single("img"), ProductController.updateProduct);

router.route("/delete/:productId").get(ProductController.deleteProduct);

module.exports = router;
