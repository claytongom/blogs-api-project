const { Category } = require('../models');

const getAll = () => Category.findAll()
      .then((categories) => categories)
      .catch((error) => {
        throw error;
      });
  
  const create = (name) => Category.create({ name })
      .then((newCategory) => newCategory)
      .catch((error) => {
        throw error;
      });
  
  const findAll = () => Category.findAll()
      .then((allCategories) => ({ type: null, message: allCategories }))
      .catch((error) => {
        throw error;
      });

module.exports = {
    getAll,
    create,
    findAll,
};