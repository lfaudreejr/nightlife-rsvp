const passport = require("passport");
require("./../controllers/auth.controller");

module.exports.facebookAuth = function(req, res) {
  req.session.redirectTo = req.query.path;
  return passport.authenticate("facebook");
};

module.exports.facebookCB = function(req, res) {
  const redirectTo = req.session.redirectTo || "/";
  return passport.authenticate("facebook", {
    successRedirect: redirectTo,
    failureRedirect: redirectTo
  })(req, res);
};
