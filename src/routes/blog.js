const express = require("express");  

const router = express.Router();

// GET blog page
router.get("/blog", function(req, res) {
  res.send("Welcome to the blog!");
});

module.exports = router;
