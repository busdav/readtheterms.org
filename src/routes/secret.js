const express = require("express");
const withAuth = require("../auth/middleware");

const router = express.Router();

router.get("/secret", withAuth, function(req, res) {
  res.send("The password is potato");
});

module.exports = router;
