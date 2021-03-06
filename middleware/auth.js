const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

// const config = process.env;
dotenv.config();

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.header('authorization');

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  console.log("Token " + token);
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    console.log("User decoded " + JSON.stringify(decoded));
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
