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
// router.get("/:user_id", findAllPostsByUserId, (req, res) => {
//   console.log("Route hit!");
//   res.send("Testing");
// });
router.delete("/:registrationId", deleteRegister);
// router.get("/findRegisteredPosts/:user_id", findAllPostsByUserId);

module.exports = router;
