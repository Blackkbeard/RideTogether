const express = require("express");
const router = express.Router();
const pool = require("../../db");
const {
  postRegister,
  findRegister,
  deleteRegister,
  findAllPostsByUserId,
} = require("../controller/postRegistration");

router.post("/registerPost", postRegister);
router.get("/:post_id", findRegister);
router.get("/registeredpost/:user_id", findAllPostsByUserId);

router.delete("/:registrationId", deleteRegister);

module.exports = router;
