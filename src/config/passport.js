const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const { userValidate } = require("./validation");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    User.findOne({ username }, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const { error } = userValidate({ username, password });
          if (error) {
            const errMessage = error.details[0].message;
            req.flash("error_msg", errMessage);
            return done(null, false);
          }

          const user = await User.findOne({ username });
          if (!user || !user.isCheckPassword()) {
            req.flash("error_msg", "Wrong account or password");
            return done(null, false);
          }

          const { is_lock } = user;
          if (is_lock) {
            req.flash("error_msg", "Your account has been locked");
            return done(null, false);
          }

          req.flash("success_msg", "Login success");
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
