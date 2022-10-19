const express = require("express");
const cors = require("cors");

const { db } = require("./db");
const { cartRouter } = require("./routes/cartRouter");
const { productRouter } = require("./routes/productRouter");

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options = {
  origin: allowedOrigins,
};

db(app);

app.use(cors(options));
app.use(express.json());

const port = 3000;

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log("Server started on localhost:3000");
});
