/* eslint-disable global-require */
const path = require("path");
const createError = require("http-errors");

module.exports = {
  init(app) {
    const indexRouter = require("../routes/index");
    const usersRouter = require("../routes/users");
    const secretsRouter = require("../routes/secret");

    app.use(indexRouter);
    app.use(usersRouter);
    app.use(secretsRouter);

    // Handle React routing, return all requests under /app to React app
    app.use(["/app", "/app/*"], function(req, res, next) {
      res.sendFile(
        path.join(__dirname, "..", "..", "client/build", "index.html")
      );
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
  }
};
