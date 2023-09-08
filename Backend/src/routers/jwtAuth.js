const express = require("express");
const pool = require("../../db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utility/jwtgenerator");
const { validInfo } = require("../middleware/validInfo");
const { authorize } = require("../middleware/authorize");

const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  verifyUser,
} = require("../controller/jwtAuth");

router.post("/register", validInfo, registerUser);
router.post("/login", loginUser);

router.get("/getUser/:id", getUserById);
router.patch("/update/:id", updateUser);
router.get("/verify", authorize, verifyUser);

module.exports = router;
