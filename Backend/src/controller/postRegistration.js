const express = require("express");
const router = express.Router();
const pool = require("../../db");
const { PostRegistration } = require("../models/postRegistration");

const postRegister = async (req, res) => {
  console.log(req.body);
  const { post_id, user_id } = req.body;
  const registration = await PostRegistration.create(post_id, user_id);
  console.log(registration);
  res.status(201).json(registration);
};

const findRegister = async (req, res) => {
  const { post_id } = req.params;
  const registrations = await PostRegistration.findByPostId(post_id);
  res.json(registrations);
};

const deleteRegister = async (req, res) => {
  const { registration_id } = req.params;
  await PostRegistration.deleteById(registration_id);
  res.status(204).send();
};

module.exports = { postRegister, findRegister, deleteRegister };
