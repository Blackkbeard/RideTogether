const express = require("express");
const pool = require("../../db");
const router = express.Router();

const Post = require("../models/posts");

const newPost = async (req, res) => {
  try {
    // console.log(11);
    // console.log(req.body);
    const newPost = await Post.createPost(req.body);
    // console.log(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating post");
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getPosts();
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving all posts");
  }
};

const getPost = async (req, res) => {
  try {
    const userId = req.params.user_id; // assuming you pass user_id as a route parameter
    const posts = await Post.getPostsByUserId(userId);
    // console.log(posts);
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving posts for the user");
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

module.exports = { newPost, getAllPosts, changePost, getPost, removePost };
