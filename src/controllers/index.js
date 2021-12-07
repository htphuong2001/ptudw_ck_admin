const Admin = require("../models/Admin");

const indexPage = async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await Admin.findOne({ username });
    console.log(user);
    res.render("dashboard/index", { title: "Dashboard", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  indexPage,
};
