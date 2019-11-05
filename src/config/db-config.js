require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  init() {
    // Set up default mongoose connection
    const mongoUri = process.env.MONGODB_URI;
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
};
