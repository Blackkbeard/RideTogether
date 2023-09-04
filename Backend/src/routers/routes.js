const { Router } = require("express");
const { getRiders } = require("../controller/controller");

const router = Router();
const pool = require("../../db");

// router.get("/", (req, res) => {
//   res.send("using api route");
// });

router.get("/riders", getRiders);

module.exports = router;
