const express = require("express");
const jwt = require("jsonwebtoken");
const withAuth = require("../auth/middleware");
const User = require("../db/models/User");

const router = express.Router();
const secret = "mysecretsshhh";

// GET protected 'secret' information
router.get("/api/secret", withAuth, function(req, res) {
  res.send("The password is potato");
});

// POST route to register a user
router.post("/api/register", function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

// POST route to authenticate a user logging in
router.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

// GET information whether token has been issued
router.get("/api/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

// GET message to be displayed in Home component
router.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

module.exports = router;
