const indexPage = (req, res, next) => {
  res.render("user/index", { title: "User" });
};

module.exports = {
  indexPage,
};
