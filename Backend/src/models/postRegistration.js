const express = require("express");
const pool = require("../../db");
const router = express.Router();

const PostRegistration = {
  async create(post_id, user_id) {
    const result = await pool.query(
      `INSERT INTO post_registrations(post_id, user_id) VALUES($1, $2) RETURNING *`,
      [post_id, user_id]
    );
    return result.rows[0];
  },

  async findByPostId(post_id) {
    const result = await pool.query(
      `SELECT * FROM post_registrations WHERE post_id = $1`,
      [post_id]
    );
    return result.rows;
  },

  async deleteById(registration_id) {
    await pool.query(
      `DELETE FROM post_registrations WHERE registration_id = $1`,
      [registration_id]
    );
  },
};

module.exports = { PostRegistration };
