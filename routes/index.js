const express = require("express");
const router = express.Router();

const User = require("../model/user");
const passport = require("passport");
const check = require("../helper/validate");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const faker = require("faker");
const fetch = require("node-fetch");

User.createMapping(function (err, mapping) {
  console.log("mapping created");
});

router.get("/", (req, res, next) => {
  if (req.user) {
    let id = req.query.id;
    if (!id) {
      res.redirect("/?id=" + req.user._id);
    } else {
      User.findById(id, (err, user) => {
        if (err) throw err;

        if (!user) {
          res.redirect("/");
        } else {
          res.render("index", { users: user });
        }
      });
    }
  } else {
    let id = req.query.id;
    if (!id) {
      res.render("login");
    } else {
      res.redirect("/");
    }
  }
});

router.post("/login", function (req, res, next) {
  if (req.user) {
    res.redirect("/");
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  }
});

router.post("/register", (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    password,
    birthday_day,
    birthday_month,
    birthday_year,
    gender,
  } = req.body;

  let obj = {};

  // obj = check.validate(
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   birthday_day,
  //   birthday_month,
  //   birthday_year,
  //   gender
  // );
  // let error = obj.errors;

  let error = [];

  if (error.length > 0) {
    res.redirect("/");
  } else {
    // firstName = obj.first_name;
    // lastName = obj.last_name;
    // email = obj.email;
    // password = obj.password;
    // gender = obj.sex;
    // let birthday = obj.birthday;

    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    email = faker.internet.email();
    password = "root";
    let gen = faker.random.boolean();

    if (gen) gender = "male";
    else gender = "female";

    let birthday = faker.date.past();
    let avatar = faker.image.avatar();

    User.findOne({ email: email }, async (err, user) => {
      if (err) throw err;

      if (user) {
        req.flash("info", "This email is exist please log in.");
        res.redirect("/");
      } else {
        var salt = await bcrypt.genSalt(+process.env.SALT_FACTOR);
        var hashPassword = await bcrypt.hash(password, salt);
        let profile_image = await fetch(
          "https://dog.ceo/api/breeds/image/random"
        ).then((response) => response.json());

        var newUser = new User({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
          username: firstName + " " + lastName,
          gender,
          birthday,
          avatar,
          profile_image: profile_image.message,
        });

        newUser
          .save()
          .then((value) => {
            res.redirect("/");
          })
          .catch((err) => {
            if (err) throw err;
          });
      }
    });
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/search", (req, res, next) => {
  let searchString = req.body.search;

  User.search(
    {
      query_string: {
        query: searchString,
      },
    },
    async function (err, results) {
      if (err) throw err;

      let reqUser = results.hits.hits;
      let resLength = reqUser.length;
      let userSearch = [];
      for (let i = 0; i < resLength; i++) {
        let user = await User.findById(reqUser[i]._id);
        userSearch.push(user);
      }

      res.render("search", { users: userSearch, search: searchString });
    }
  );
});

module.exports = router;
