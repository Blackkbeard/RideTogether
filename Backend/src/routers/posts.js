const express = require("express");
const router = express.Router();
const pool = require("../../db");
const {
  newPost,
  changePost,
  getAllPosts,
  getPost,
  removePost,
} = require("../controller/posts");

router.post("/newPost", newPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:user_id", getPost);
router.patch("/editpost/:post_id", changePost);
router.delete("/deletepost/:post_id", removePost);

module.exports = router;
