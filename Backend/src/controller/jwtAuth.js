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

// const updateProfile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let updates = [];
//     let values = [];
//     let index = 1;

//     // Check if fields are in req.body and push them into updates and values arrays
//     const fields = ['full_name', 'mobile_number', 'biography',];
//     fields.forEach(field => {
//       if (field in req.body) {
//         updates.push(`${field} = $${index}`);
//         values.push(req.body[field]);
//         index++;
//       }
//     });

//     // Handle location fields
//     if ("location" in req.body) {
//       if ("district" in req.body.location) {
//         updates.push(`district = $${index}`);
//         values.push(req.body.location.district);
//         index++;
//       }

//       if ("postal_code" in req.body.location) {
//         updates.push(`postal_code = $${index}`);
//         values.push(req.body.location.postal_code);
//         index++;
//       }
//     }

//     // Construct the SQL update query
//     const query = `
//       UPDATE users
//       SET ${updates.join(', ')}
//       WHERE user_id = $${index}
//       RETURNING *;
//     `;

//     values.push(id);  // Add user_id to the values array for WHERE clause

//     // Execute the update
//     const result = await pool.query(query, values);

//     if (result.rows.length > 0) {
//       res.json({ status: "ok", msg: "Account updated", updatedUser: result.rows[0] });
//     } else {
//       res.json({ status: "error", msg: "User not found" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: error.message });
//   }
// };
const updateUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user_id = req.params.id;
    const { username, email, password, full_name } = req.body;

    // 1. Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    console.log(2);
    if (user.rows.length === 0) {
      return res.status(401).json("User not found");
    }

    let updatedFields = [];
    let values = [];
    const conditions = [];
    console.log(3);
    if (username) {
      updatedFields.push("username");
      values.push(username);
      conditions.push(`username = $${values.length}`);
    }
    console.log(4);
    if (full_name) {
      updatedFields.push("full_name");
      values.push(full_name);
      conditions.push(`full_name = $${values.length}`);
    }
    console.log(5);
    if (password) {
      // bcrypt the new password
      const saltRound = 5;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      updatedFields.push("password");
      values.push(bcryptPassword);
      conditions.push(`password = $${values.length}`);
    }
    console.log(6);
    if (!updatedFields.length) {
      return res.status(400).json("No fields to update");
    }

    // Add email as last value for WHERE condition
    values.push(email);

    // Create SQL UPDATE statement
    // Vinesh update SQL command
    const updateSQL = `
      UPDATE users
      SET ${conditions.join(", ")}
      WHERE email = $${values.length}
      RETURNING *;
    `;
    const result = await pool.query(updateSQL, values);
    //Lian Kai update SQL command
    // const updateSQL = `UPDATE users
    //   SET username = req.body.username
    //   WHERE user_id = user_id`;
    console.log(7);
    console.log(result);
    // Execute the update
    // const result = await pool.query(
    //   "UPDATE users SET username = $1 WHERE user_id = $2",
    //   [req.body.username, user_id]
    // );
    // console.log(7);
    // console.log(result.rows);

    // const query =
    //   "UPDATE users SET email = $1, password = $2, username = $3, full_name = $4 WHERE user_id = $5";
    // const values1 = [email, password, username, full_name, user_id];
    // await pool.query(query, values1);

    if (result.rows.length > 0) {
      res.json({
        status: "success",
        msg: "User updated successfully",
        updatedUser: result.rows[0],
      });
    } else {
      res.json({ status: "error", msg: "Update failed" });
    }
    console.log(8);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Update Error");
    console.log(9);
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
