const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/user");
const { userValidate } = require("./validation");

require("dotenv").config();

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
            return done(null, false, req.flash("error_msg", errMessage));
          }

          const user = await User.findOne({ username });
          if (!user || !user.isCheckPassword()) {
            return done(
              null,
              false,
              req.flash("error_msg", "Wrong account or password")
            );
          }

          const { is_lock } = user;
          if (is_lock) {
            return done(
              null,
              false,
              req.flash("error_msg", "Your account has been locked")
            );
          }

          return done(null, user, req.flash("success_msg", "Login success"));
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(async () => {
          try {
            const user = await User.findOne({ username: profile.id });
            if (user) {
              return done(null, user);
            }

            const newUser = new User({ username: profile.id });
            const savedUser = await newUser.save();
            return done(null, savedUser);
          } catch (err) {
            return done(err);
          }
        });
      }
    )
  );
};
