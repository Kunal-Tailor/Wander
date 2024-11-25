const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require("connect-flash");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")

// Signup Route
router.get("/signup", userController.rendersignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signup)
);

// Login Route
router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// Logout Route
router.get("/logout", userController.logout);

module.exports = router;
