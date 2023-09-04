const pool = require("../../db");

const getRiders = async (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

module.exports = { getRiders };
