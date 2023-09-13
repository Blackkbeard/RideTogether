// const express = require("express");
// const pool = require("../../db");
// const router = express.Router();

// const PostRegistration = async (post_id, user_id) => {
//   const result = await pool.query(
//     `INSERT INTO post_registrations(post_id, user_id) VALUES($1, $2) RETURNING *`,
//     [post_id, user_id]
//   );
//   return result.rows[0];
// };

// const findByPostId = async (post_id) => {
//   const result = await pool.query(
//     `SELECT * FROM post_registrations WHERE post_id = $1`,
//     [post_id]
//   );
//   return result.rows;
// };

// const deleteById = async (registration_id) => {
//   await pool.query(
//     `DELETE FROM post_registrations WHERE registration_id = $1`,
//     [registration_id]
//   );
// };

// module.exports = { PostRegistration, findByPostId, deleteById };

const express = require("express");
const pool = require("../../db");
const router = express.Router();

const createPost = async (post_id, user_id) => {
  const result = await pool.query(
    `INSERT INTO post_registrations(post_id, user_id) VALUES($1, $2) RETURNING *`,
    [post_id, user_id]
  );
  return result.rows[0];
};

const findByPostId = async (post_id) => {
  const result = await pool.query(
    `SELECT * FROM post_registrations WHERE post_id = $1`,
    [post_id]
  );
  return result.rows;
};

const deleteById = async (registration_id) => {
  await pool.query(
    `DELETE FROM post_registrations WHERE registration_id = $1`,
    [registration_id]
  );
};
const findPostsByUserId = async (user_id) => {
  console.log({ user_id });
  try {
    const result = await pool.query(
      "SELECT posts.* FROM post_registrations JOIN posts ON posts.post_id = post_registrations.post_id WHERE post_registrations.user_id = $1",
      [user_id]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const checkRegistrationExists = async (post_id, user_id) => {
  const result = await pool.query(
    `SELECT * FROM post_registrations WHERE post_id = $1 AND user_id = $2`,
    [post_id, user_id]
  );
  return result.rows.length > 0;
};

module.exports = {
  createPost,
  findByPostId,
  deleteById,
  findPostsByUserId,
  checkRegistrationExists,
};
