const express = require("express");
const router = express.Router();
const randomImageModel = require("../models/bike");

router.get("/randomimage", (req, res) => {
  randomImageModel.getRandomImage((err, filePath) => {
    if (err) {
      res.status(500).send("Error reading directory");
      return;
    }
    res.sendFile(filePath);
  });
});

module.exports = router;
