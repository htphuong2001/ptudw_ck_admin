const express = require("express");

const TagController = require("../controllers/tag");

const router = express.Router();

router.route("/").get(TagController.indexPage).post(TagController.getTags);

router.route("/add").get(TagController.addTagPage).post(TagController.addTag);

router
  .route("/update/:tagId")
  .get(TagController.updateTagPage)
  .post(TagController.updateTag);

router.route("/delete/:tagId").get(TagController.deleteTag);

module.exports = router;
