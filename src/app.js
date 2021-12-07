require("dotenv").config();
const path = require("path");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");

const mongoDB = require("./config/mongodb");
const auth = require("./middlewares/auth");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const tagRouter = require("./routes/tag");
const productRouter = require("./routes/product");
const adminRouter = require("./routes/admin");

const app = express();
const port = process.env.PORT;

// Connect database
mongoDB.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file
app.use("/assets", express.static(path.join(__dirname, "public")));

// EJS engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Logger
app.use(logger("dev"));

// Routing
app.use("/category", auth.checkLogin, categoryRouter);
app.use("/tag", auth.checkLogin, tagRouter);
app.use("/product", auth.checkLogin, productRouter);
app.use("/admin", auth.checkLogin, adminRouter);
app.use("/auth", authRouter);
app.use("/", auth.checkLogin, indexRouter);

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
