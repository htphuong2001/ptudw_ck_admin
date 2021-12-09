const indexPage = (req, res, next) => {
  res.render("order/index", { title: "Order" });
};

module.exports = {
  indexPage,
};
