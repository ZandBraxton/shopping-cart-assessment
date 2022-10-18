const mongoose = require("mongoose");

const db = async (app) => {
  await mongoose.connect("mongodb://localhost:27017/cart");
  console.log("Connected to database");

  if (app) {
    app.set("mongoose", mongoose);
  }
};

module.exports = { db };
