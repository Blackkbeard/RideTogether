const express = require("express");
const router = express.Router();
const {
  createPostEnquiry,
  getPostEnquiry,
} = require("../controller/postEnquiry");

router.post("/", createPostEnquiry);
router.get("/:id", getPostEnquiry);

module.exports = router;
