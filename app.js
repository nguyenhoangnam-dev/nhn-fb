// @ts-nocheck
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Security
const helmet = require("helmet");
const cors = require("cors");
const csurl = require("csurl");
const session = require("express-session");
require("dotenv/config");

// Database
const mongoose = require("mongoose");

// Login
const passport = require("passport");
const flash = require("connect-flash");
require("./config/passport")(passport);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Security middleware
app.use(helmet());
app.use(cors());

// Morgan log
app.use(logger("dev"));

// Post method
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie sign
app.use(cookieParser(process.env.COOKIE_SIGN));

// Session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   // httpOnly: true,
    //   secure: true,
    // },
  })
);

// Passport save session
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());
app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  res.locals.warm = req.flash("warm");
  res.locals.danger = req.flash("danger");
  next();
});

// Serve static file
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) throw err;
  }
);

module.exports = app;
