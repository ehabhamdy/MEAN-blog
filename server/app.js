const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const mongoServerLocal = "mongodb://system:mongo@127.0.0.1:27017/mongo";
// OR use process.env.DB_CLOUD for the cloud mongo instance
mongoose
  .connect(mongoServerLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, C-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("images")));

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
