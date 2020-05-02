var LocalStrategy = require("passport-local").Strategy;
var User = require("../model/user");
var bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "loginEmail", passwordField: "loginPassword" },
      function (email, password, done) {
        // Match email
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);

          if (!user)
            return done(null, false, { message: "Wrong email or password." });

          if (!user.check_mail)
            return done(null, false, {
              message: "Please verify email before login.",
            });

          // Match password
          bcrypt.compare(password, user.password, function (err, success) {
            if (err) return done(err);

            if (success) return done(null, user);
            return done(null, false, { message: "Wrong email or password." });
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
