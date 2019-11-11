require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  init() {
    // Set up default mongoose connection
    if (process.env.NODE_ENV === "test") {
      const mongoUri = process.env.MONGODB_URI_TEST;
      mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      db.once("open", function() {
        console.log(`Successfully connected to ${mongoUri}`);
      });
    } else {
      const mongoUri = process.env.MONGODB_URI_DEV;
      mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      db.once("open", function() {
        console.log(`Successfully connected to ${mongoUri}`);
      });
    }
  }
};
