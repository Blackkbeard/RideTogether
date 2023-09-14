const express = require("express");
const router = express.Router();
const pool = require("../../db");
const {
  createPost,
  findByPostId,
  deleteById,
  findPostsByUserId,
  checkRegistrationExists,
  deleteByPostAndUser,
} = require("../models/postRegistration");

// const postRegister = async (req, res) => {
//   console.log(1);
//   console.log(req.body);
//   const { post_id, user_id } = req.body;
//   const registration = await createPost(post_id, user_id);
//   console.log(registration);
//   console.log(2);
//   res.status(201).json(registration);
// };

const postRegister = async (req, res) => {
  const { post_id, user_id } = req.body;

  // Check if the registration already exists
  const exists = await checkRegistrationExists(post_id, user_id);
  if (exists) {
    return res
      .status(400)
      .json({ message: "User is already registered for this post" });
  }

  const registration = await createPost(post_id, user_id);
  res.status(201).json(registration);
};

const findRegister = async (req, res) => {
  const { post_id } = req.params;
  const registrations = await findByPostId(post_id);
  res.json(registrations);
};

const deleteRegister = async (req, res) => {
  const { registration_id } = req.params;
  await deleteById(registration_id);
  res.status(204).send();
};

// controller

const findAllPostsByUserId = async (req, res) => {
  console.log(1);
  const { user_id } = req.params;
  try {
    console.log(user_id);
    const registeredPosts = await findPostsByUserId(user_id);
    console.log(registeredPosts);
    res.json(registeredPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRegisteredPost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.params; // Assuming you send the user_id in the request body
  console.log(post_id, user_id);
  try {
    await deleteByPostAndUser(post_id, user_id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  postRegister,
  findRegister,
  deleteRegister,
  findAllPostsByUserId,
  deleteRegisteredPost,
};
