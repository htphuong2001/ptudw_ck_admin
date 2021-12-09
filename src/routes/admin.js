const express = require("express");

const AdminController = require("../controllers/admin");

const router = express.Router();

router
  .route("/")
  .get(AdminController.indexPage)
  .post(AdminController.getAdmins);

router
  .route("/new")
  .get(AdminController.newAdminPage)
  .post(AdminController.newAdmin);

router.route("/update/:adminId").get(AdminController.updateAdmin);

router.route("/delete/:adminId").get(AdminController.deleteAdmin);

module.exports = router;
