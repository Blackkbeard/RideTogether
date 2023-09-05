const pool = require("../../db");
const queries = require("../queries");

const getRiders = async (req, res) => {
  pool.query(queries.getRiders, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

module.exports = { getRiders };
