const express = require("express");

const router = express.Router();

/* GET home page - is being overriden by React App stubs for some reason. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* See above - still need to find a better way to have homepage be the templated version of "/"  */
router.get("/homepage", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/home", function(req, res) {
  res.send("Welcome!");
});

module.exports = router;
