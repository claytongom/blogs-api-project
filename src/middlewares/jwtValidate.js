const jwt = require('jsonwebtoken');

const secretToken = process.env.JWT_SECRET || 'token_secret';

const verifyToken = (req, res, next) => {
  const toke = req.header('Authorization');
  if (!toke) {
    return res.status(401).json({ message: 'Token not found' });
  }

  let tokenVerified;
  try {
    tokenVerified = jwt.verify(toke, secretToken);
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  if (tokenVerified) {
    next();
  } else {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = verifyToken;
