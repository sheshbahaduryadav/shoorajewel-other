const { allowedOrigins } = require('../config/corsOptions.js');

const allowCredentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

module.exports = allowCredentials;
