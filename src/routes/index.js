const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

module.exports = router;
