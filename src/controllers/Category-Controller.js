const CategoryService = require('../services/Category-Service');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    
    const category = await CategoryService.create(name);
    
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allCategories = await CategoryService.getAll();
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await CategoryService.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  create,
  getAll,
  findAll,
};