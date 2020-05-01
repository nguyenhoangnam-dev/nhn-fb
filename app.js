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
    cookie: {
      // httpOnly: true,
      secure: true,
    },
  })
);

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

module.exports = app;
