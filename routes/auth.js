const express = require("express");
const router = express.Router();
const passport = require("passport");
require("./../controllers/auth.controller");

router.get("/", (req, res) => {
  res.send("Auth routes");
});
// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "user_location"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failure"
  })
);
// Twitter
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failure"
  })
);

module.exports = router;
