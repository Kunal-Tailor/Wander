const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require("connect-flash");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let { username, email, password } = req.body;

    const newUser = new User({ username, email });
    try {
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
      })
      
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in!");
    res.redirect("/listings");
  }
);

router.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are logged out ! ");
    res.redirect("/listings");
  })
})

module.exports = router;
