const express = require("express");
const pool = require("../../db");
const router = express.Router();

// Create Post
const createPost = async (data) => {
  const { user_id, username, location, duration, max_pax, details, ride_date } =
    data;
  const result = await pool.query(
    `
    INSERT INTO posts(user_id, username, location, duration,  max_pax, details, ride_date)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
    [user_id, username, location, duration, max_pax, details, ride_date]
  );

  return result.rows[0];
};

const editPost = async (data) => {
  const { post_id, location, duration, details, ride_date } = data;
  const result = await pool.query(
    `
    UPDATE posts
    SET location = $1, duration = $2, details = $3, ride_date = $4
    WHERE post_id = $5
    RETURNING *;
  `,
    [title, content, post_id]
  );

  return result.rows[0];
};

const deletePost = async (post_id) => {
  const result = await pool.query(
    `
    DELETE FROM posts
    WHERE post_id = $1
    RETURNING *;
  `,
    [post_id]
  );

  return result.rows[0];
};

module.exports = {
  createPost,
  editPost,
  deletePost,
};