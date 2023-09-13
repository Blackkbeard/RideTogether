const express = require("express");
const router = express.Router();
const pool = require("../../db");
const fs = require("fs");
const path = require("path");

const IMAGE_DIR = path.join(
  "/Users",
  "vinesh",
  "GeneralAssembly",
  "RideTogether ",
  "Randombikes"
);

const getRandomImage = (callback) => {
  fs.readdir(IMAGE_DIR, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(IMAGE_DIR, randomFile);
    callback(null, filePath);
  });
};

module.exports = {
  getRandomImage,
};
