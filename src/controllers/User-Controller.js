const jwt = require('jsonwebtoken');
const UserService = require('../services/User-Service');

const jwtConfigToken = { expiresIn: '7d', algorithm: 'HS256' };
const tokenSecret = process.env.JWT_SECRET || 'token_secret';

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UserService.login(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { userId: user.id } }, tokenSecret, jwtConfigToken);

  return res.status(200).json({ token });
};

const userValidate = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!displayName || !email || !password || !image) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await UserService.create(displayName, email, password, image);
  const token = jwt.sign({ data: { userId: user.id } }, tokenSecret, jwtConfigToken);
  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  try {
    const users = await UserService.getAll();
    
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserService.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

module.exports = {
  userLogin,
  userValidate,
  getAll,
  getById,
};