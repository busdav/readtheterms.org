const express = "a";

const router = express.Router();

let test;

// GET blog page
router.get("/blog", function(req, res) {
  res.send("Welcome to the blog!");
});

module.exports = router;
