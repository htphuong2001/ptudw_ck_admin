const generator = require("generate-password");
const { sendPassword } = require("../utils/mail");
const Admin = require("../models/Admin");
const { Promise } = require("mongoose");

const indexPage = (req, res, next) => {
  res.render("admin/index", { title: "Admin" });
};

const getAdmins = async (req, res, next) => {
  try {
    const { draw, columns, order, start, length } = req.body;
    const nameColSort = columns[order[0].column].data;

    const recordsTotal = await Admin.find({}).sort({
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

const newAdminPage = (req, res, next) => {
  res.render("admin/new", { title: "Admin" });
};

const newAdmin = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    console.log(username, email);
    const password = generator.generate({
      length: 8,
      numbers: true,
    });
    console.log(password);
    const newAdmin = new Admin({
      username,
      email,
      password,
    });
    await newAdmin.save();
    await sendPassword(email, username, password);
    // await Promise.all(newAdmin.save(), sendPassword(email, username, password));

    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    if (req.user._id != adminId && req.user.role == "sa") {
      const user = await Admin.findById(adminId);
      await Admin.findByIdAndUpdate(adminId, { is_lock: !user.is_lock });
    }
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    if (req.user._id != adminId && req.user.role == "sa") {
      await Admin.findByIdAndDelete(adminId);
    }
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  indexPage,
  getAdmins,
  newAdminPage,
  newAdmin,
  updateAdmin,
  deleteAdmin,
};
