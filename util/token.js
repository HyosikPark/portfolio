const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const getToken = (context) => {
  const auth = context.req.headers.authorization;

  if (!auth) {
    throw new Error('Authorization header must be provided');
  }

  const token = auth.split('Bearer ')[1];

  if (!token) {
    throw new Error("Authentication token must be 'Bearer[token]");
  }

  const user = jwt.verify(token, SECRET_KEY);

  if (!user) {
    throw new AuthenticationError('Invalid/expired Token');
  }

  return user;
};

module.exports = { generateToken, getToken };
