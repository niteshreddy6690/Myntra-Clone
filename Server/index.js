const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/userRouts");
const addressRoutes = require("./routes/addressRoute");
const wishlistRoutes = require("./routes/wishlistRouts");
const cors = require("cors");

const app = express();
const PORT = 8080;
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.listen(process.env.PORT || 8080, () => {
  console.log("backend server listening on port " + PORT);
});
