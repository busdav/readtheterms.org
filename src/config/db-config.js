require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  init() {
    // Set up default mongoose connection
    const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`;
    mongoose.connect(mongoUri, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", function() {
      console.log(`Successfully connected to ${mongoUri}`);
    });
  }
};
