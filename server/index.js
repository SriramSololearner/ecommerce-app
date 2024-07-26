const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
require("dotenv").config();
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("mongoDb connected!");
  })
  .catch((er) => console.log(er));

app.get("/api", (req, res) => {
  res.json({ data: { mes: "Hello World" } });
});

//authRoutes
app.use("/api", authRoutes);
//userRoutes
app.use("/api", userRoutes);
//productRoutes
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${8084}`);
});
