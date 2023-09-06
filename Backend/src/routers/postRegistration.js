const express = require("express");
const router = express.Router();
const pool = require("../../db");
const {
  postRegister,
  findRegister,
  deleteRegister,
} = require("../controller/postRegistration");

router.post("/", postRegister);
router.get("/:postId", findRegister);
router.delete("/:registrationId", deleteRegister);

module.exports = router;
