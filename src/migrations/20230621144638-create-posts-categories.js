'use strict';

module.exports = {
  up: createPostsCategoriesTable,
  down: dropPostsCategoriesTable
};

async function createPostsCategoriesTable(queryInterface, Sequelize) {
  const fields = {
    postId: {
      type: Sequelize.INTEGER,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    }
  };

  await queryInterface.createTable('posts_categories', fields);
}

async function dropPostsCategoriesTable(queryInterface, _Sequelize) {
  await queryInterface.dropTable('posts_categories');
}
