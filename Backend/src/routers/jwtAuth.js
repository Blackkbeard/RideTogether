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
  updateUser,
} = require("../controller/jwtAuth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update/:id", updateUser);

module.exports = router;
