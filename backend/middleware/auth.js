const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token_key = process.env.TOKEN_KEY;
  console.log("token ", token_key);
  const token_header = req.headers.token;
  try {
    if (!token_header) {
      res.status(400).send("token is not provided");
    }
    const verification = await jwt.verify(token_header, token_key);
    if (verification) {
      req.user = verification;
    }
  } catch (err) {
    console.log("err ", err);
    res.status(400).send("invalid token");
  }
  return next();
};

module.exports = auth;
