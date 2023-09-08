const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

// function jwtGenerator(user_id) {
//   const payload = {
//     user: user_id,
//   };

//   const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
//   const refreshToken = jwt.sign(payload, process.env.refreshTokenSecret); // Note: Add a new secret for refresh tokens

//   return { token, refreshToken };
// }

module.exports = jwtGenerator;
