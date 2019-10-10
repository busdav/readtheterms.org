const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const withAuth = require("./src/auth/middleware");
const User = require("./src/db/models/User");

const secret = "mysecretsshhh";

const appConfig = require("./src/config/app-config.js");
const routeConfig = require("./src/config/route-config.js");
const dbConfig = require("./src/config/db-config.js");

const app = express();
dbConfig.init();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.get("/api/secret", withAuth, function(req, res) {
  res.send("The password is potato");
});

/* GET users listing. */
app.get("/users", function(req, res, next) {
  res.send("respond with a resource");
});

// POST route to register a user
app.post("/api/register", function(req, res) {
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

app.post("/api/authenticate", function(req, res) {
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

app.get("/api/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

/* GET home page - is being overriden by React App stubs for some reason. */
app.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

app.get("/home", function(req, res) {
  res.send("Welcome!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));

// Handle React routing, return all requests under /app to React app
app.use(["/app", "/app/*"], function(req, res, next) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// appConfig.init(app, express);
// routeConfig.init(app);

module.exports = app;
