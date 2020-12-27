const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const Post = require("./models/post");

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  console.log("posts fetched")
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
});

app.use("/api/posts/:id", (req, res, err) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  })
});

module.exports = app;
