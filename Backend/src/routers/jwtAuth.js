const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utility/jwtgenerator");
// const validInfo = require("../middleware/validinfo");
// const authorization = require("../middleware/authorization");

// register route
router.post("/register", async (req, res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    const { username, email, password, full_name } = req.body;

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
      "INSERT INTO users (username,full_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, full_name, email, bcryptPassword]
    );

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    console.log({ token });
    res.json("user registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Register Error");
  }
});
router.post("/login", async (req, res) => {
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
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // 3. give them the jwt token
    const jwtToken = jwtGenerator(user.rows[0].user_id);

    res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
