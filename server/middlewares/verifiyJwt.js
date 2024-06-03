const jwt = require('jsonwebtoken');
require('dotenv').config;

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403); //forbidden-invalid token
      req.fullName = decoded.userInfo.fullName;
      req.id = decoded.userInfo.id;
      next();
    });
  } catch (err) {
    res.json(err.message);
  }
};
module.exports = verifyJwt;
