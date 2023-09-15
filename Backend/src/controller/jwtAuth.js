const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utility/jwtgenerator");
const { validInfo } = require("../middleware/validInfo");
const { authorize } = require("../middleware/authorize");

// register route
const registerUser = async (req, res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    const {
      username,
      email,
      password,
      full_name,
      biography,
      location,
      mobile_number,
    } = req.body;

    // 2. check if user exists (if user exists then throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // 3. bcrypt the user password
    const saltRound = 5;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (username,full_name, email, password, biography, location, mobile_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        username,
        full_name,
        email,
        bcryptPassword,
        biography,
        location,
        mobile_number,
      ]
    );

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    console.log({ token });
    res.json("user registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Register Error");
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. check if user doesn't exist (if not then we throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // 2. check if incoming password is the same as db password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // 3. give them the jwt token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    console.log(jwtToken);
    res.json({ jwtToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateUser = async (req, res) => {
  console.log(req.params.id);
  const user_id = req.params.id;
  const {
    username,
    email,
    password,
    full_name,
    biography,
    location,
    mobile_number,
  } = req.body;
  console.log(1);
  try {
    // 1. Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("User not found");
    }
    console.log(2);
    // 2. If password is provided, hash it
    let bcryptPassword;
    if (password) {
      const saltRound = 5;
      const salt = await bcrypt.genSalt(saltRound);
      bcryptPassword = await bcrypt.hash(password, salt);
    }
    console.log(3);
    // 3. Update all fields
    const updateSQL = `
            UPDATE users
            SET 
                username = $1,
                email = $2,
                password = $3,
                full_name = $4,
                biography = $5,
                location = $6,
                mobile_number = $7
            WHERE user_id = $8
            RETURNING *;
        `;

    const values = [
      username,
      email,
      bcryptPassword,
      full_name,
      biography,
      location,
      mobile_number,
      user_id,
    ];
    const result = await pool.query(updateSQL, values);
    console.log(result);
    if (result.rows.length > 0) {
      res.json({
        status: "success",
        msg: "User updated successfully",
        updatedUser: result.rows[0],
      });
    } else {
      res.json({ status: "error", msg: "Update failed" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Update Error");
  }
};

const verifyUser = async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  verifyUser,
};
