// Description: This file is used to connect to the database.
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "db_user",
  host: "localhost",
  database: "ridetogether",
  password: "example",
  port: 5432,
});

module.exports = pool;
