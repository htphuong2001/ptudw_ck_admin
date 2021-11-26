require("dotenv").config();
const path = require("path");
const createError = require("http-errors");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT;

// Static file
app.use("/assets", express.static(path.join(__dirname, "public")));

// EJS engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("pages/products");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error", { layout: false });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
