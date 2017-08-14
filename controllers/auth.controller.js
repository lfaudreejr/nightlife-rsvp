const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("./../models/user.model");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// Sign in with Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["name", "email", "location"],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      if (req.user) {
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            done(err);
          } else {
            User.findById(req.user.id, function(err, user) {
              user.name =
                user.name ||
                profile.name.givenName + " " + profile.name.familyName;
              user.picture =
                user.picture ||
                "https://graph.facebook.com/" +
                  profile.id +
                  "/picture?type=large";
              user.facebook = profile.id;
              done(err, user);
            });
          }
        });
      } else {
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            return done(err, user);
          }
          User.findOne({ email: profile._json.email }, function(err, user) {
            if (user) {
              done(err);
            } else {
              var newUser = new User({
                name: profile.name.givenName + " " + profile.name.familyName,
                email: profile._json.email,
                location: profile._json.location && profile._json.location.name,
                picture:
                  "https://graph.facebook.com/" +
                  profile.id +
                  "/picture?type=large",
                facebook: profile.id
              });
              newUser.save(function(err) {
                done(err, newUser);
              });
            }
          });
        });
      }
    }
  )
);

// Sign in with Twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "/auth/twitter/callback",
      passReqToCallback: true
    },
    function(req, accessToken, tokenSecret, profile, done) {
      if (req.user) {
        User.findOne({ twitter: profile.id }, function(err, user) {
          if (user) {
            done(err);
          } else {
            User.findById(req.user.id, function(err, user) {
              user.name = user.name || profile.displayName;
              user.location = user.location || profile._json.location;
              user.picture =
                user.picture || profile._json.profile_image_url_https;
              user.twitter = profile.id;
              user.save(function(err) {
                done(err, user);
              });
            });
          }
        });
      } else {
        User.findOne({ twitter: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return done(null, existingUser);
          }
          var newUser = new User({
            name: profile.displayName,
            location: profile._json.location,
            picture: profile._json.profile_image_url_https,
            twitter: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        });
      }
    }
  )
);
