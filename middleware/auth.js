const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) res.status(401).json({ msg: "No token, authorisation denied" });

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get("secretkey"));

    //Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
