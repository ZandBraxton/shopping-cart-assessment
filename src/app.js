require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { db } = require("./db");
const { cartRouter } = require("./routes/cartRouter");
const { productRouter } = require("./routes/productRouter");

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN, process.env.CLIENT_ORIGIN];

const options = {
  origin: allowedOrigins,
};

db(app);

app.use(cors(options));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on localhost:3000");
});
