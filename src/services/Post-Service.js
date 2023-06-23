const { BlogPost, User, Category } = require('../models');

const getAll = async () => {
  try {
    const categories = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category, as: 'categories', 
        },
      ],
    });
    
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAll,
};