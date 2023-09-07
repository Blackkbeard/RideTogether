const router = require("express").Router();
const pool = require("../../db");
const { authorize } = require("../middleware/authorize");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT username FROM users WHERE user_id = $1",
      [req.user]
    );
    console.log(1);
    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
