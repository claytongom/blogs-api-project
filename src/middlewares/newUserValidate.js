const UserService = require('../services/User-Service');

const validateDisplayName = (displayName) => displayName.length >= 8;

const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex);
};

const validatePassword = (password) => password.length >= 6;

const checkIfUserExists = async (email) => {
  const users = await UserService.getAll();
  const usersEmails = users.map((e) => e.email);
  return usersEmails.includes(email);
};

const middleware = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const messageName = '"displayName" length must be at least 8 characters long';
  if (!validateDisplayName(displayName)) return res.status(400).json({ message: messageName });

  const messageEmail = '"email" must be a valid email';
  if (!validateEmail(email)) return res.status(400).json({ message: messageEmail });

  const messagePassword = '"password" length must be at least 6 characters long';
  if (!validatePassword(password)) return res.status(400).json({ message: messagePassword });

  const userExists = await checkIfUserExists(email);
  const messageRegister = 'User already registered';
  if (userExists) return res.status(409).json({ message: messageRegister });

  next();
};

module.exports = middleware;
