import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// In-memory fallback store when MongoDB is not connected
let isMongoConnected = false;
let inMemoryPosts = [
  { _id: "1", title: "Getting Started with MERN", content: "MongoDB, Express, React, Node.js full-stack development." },
  { _id: "2", title: "React State Management", content: "Understanding useState, useEffect, and component lifecycles." },
  { _id: "3", title: "RESTful API Design", content: "Best practices for writing clean and robust CRUD endpoints in Express." }
];

// Connect to MongoDB
if (mongoUri) {
  mongoose
    .connect(mongoUri, { dbName, serverSelectionTimeoutMS: 2500 })
    .then(() => {
      isMongoConnected = true;
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      isMongoConnected = false;
      console.log("MongoDB connection failed, falling back to in-memory store:", err.message);
    });
} else {
  console.log("No MONGO_URI provided, running in in-memory mode.");
}

// Define the Post schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { bufferCommands: false });
const Post = mongoose.model("Post", postSchema);

// CRUD operations for Blog Posts
// Create a new post
app.post("/api/v1/posts", async (req, res) => {
  try {
    if (isMongoConnected) {
      const post = new Post(req.body);
      await post.save();
      return res.status(201).send({ message: "Post created successfully", data: post });
    }
    const newPost = {
      _id: Date.now().toString(),
      title: req.body.title || "",
      content: req.body.content || ""
    };
    inMemoryPosts.push(newPost);
    res.status(201).send({ message: "Post created successfully", data: newPost });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read all posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    if (isMongoConnected) {
      const posts = await Post.find();
      return res.status(200).send({ message: "Posts retrieved successfully", data: posts });
    }
    res.status(200).send({ message: "Posts retrieved successfully", data: inMemoryPosts });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read post by id
app.get("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isMongoConnected) {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.status(200).send({ message: "Post retrieved successfully", data: post });
    }
    const post = inMemoryPosts.find((p) => p._id === req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post retrieved successfully", data: post });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update post by id
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isMongoConnected) {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.status(200).send({ message: "Post updated successfully", data: post });
    }
    const index = inMemoryPosts.findIndex((p) => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).send({ message: "Post not found" });
    }
    inMemoryPosts[index] = { ...inMemoryPosts[index], ...req.body, _id: req.params.id };
    res.status(200).send({ message: "Post updated successfully", data: inMemoryPosts[index] });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete post by id
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isMongoConnected) {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.status(200).send({ message: "Post deleted successfully", data: post });
    }
    const exists = inMemoryPosts.some((p) => p._id === req.params.id);
    if (!exists) {
      return res.status(404).send({ message: "Post not found" });
    }
    inMemoryPosts = inMemoryPosts.filter((p) => p._id !== req.params.id);
    res.status(200).send({ message: "Post deleted successfully", data: { _id: req.params.id } });
  } catch (err) {
    res.status(400).send(err);
  }
});
//Test route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Express Test" });
});
//Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
