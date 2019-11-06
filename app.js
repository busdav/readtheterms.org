const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require("http-errors");
const dbConfig = require("./src/config/db-config.js");
const staticRouter = require("./src/routes/static");
const blogRouter = require("./src/routes/blog");
const userRouter = require("./src/routes/users");

const app = express();

let test;

// Miscellaneous
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// Initialize mongoose and MongoDB
dbConfig.init();

// View engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Initialize API routes
app.use(staticRouter);
app.use(blogRouter);
app.use(userRouter);

/* Serve any static files by this Express app - looking in Express app as well as built React app. 
The one for client cannot be before the routes above for templated views, 
because will override with index.html from client/build. */
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

module.exports = app;
