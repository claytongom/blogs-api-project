const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll();
  const usersWithoutPassword = users.map((user) => {
    const { password, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  });
  return usersWithoutPassword;
};

const login = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user ? user.get({ plain: true }) : null;
};

const create = async (displayName, email, password, image) => {
  const { dataValues: newUser } = await User.create({
    displayName,
    email,
    password,
    image,
  });
  return newUser;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (user) {
    return user.get({ plain: true });
  }

  return null;
};

module.exports = {
  getAll,
  login,
  create,
  getById,
};