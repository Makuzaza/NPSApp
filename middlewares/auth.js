const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    req.isAuth = false;
    return next();
  }
  const verifyToken = await jwt.verify(
    token,
    "Nj8MHpEU1sBOX4xgP0S6tQKvLTy2VzRr"
  );
  if (!verifyToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  return next();
};

module.exports = auth;
