const passport = require("passport");

const User = require("./../models/user.model");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports.getUser = function(req, res) {
  const user = false;
  if (req.user) {
    user = req.user.toJSON();
  }
  res.send(user);
};
module.exports.logout = function(req, res) {
  req.logout();
  res.send({ success: true });
};
