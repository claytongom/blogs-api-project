const PostService = require('../services/Post-Service');

const getAll = async (req, res) => {
  try {
    const posts = await PostService.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
};