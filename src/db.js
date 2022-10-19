require("dotenv").config();

const mongoose = require("mongoose");

const db = async (app) => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to database");

  if (app) {
    app.set("mongoose", mongoose);
  }
};

module.exports = { db };
