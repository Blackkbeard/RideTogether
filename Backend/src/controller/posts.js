const express = require("express");
const pool = require("../../db");
const router = express.Router();

const Post = require("../models/posts");

const newPost = async (req, res) => {
  try {
    console.log(11);
    console.log(req.body);
    const newPost = await Post.createPost(req.body);
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating post");
  }
};

const changePost = async (req, res) => {
  try {
    const updatedPost = await Post.editPost(req.body);
    if (!updatedPost) return res.status(404).send("Post not found");
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send("Error updating post");
  }
};

const removePost = async (req, res) => {
  try {
    const deletedPost = await Post.deletePost(req.params.post_id);
    if (!deletedPost) return res.status(404).send("Post not found");
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send("Error deleting post");
  }
};

module.exports = { newPost, changePost, removePost };
