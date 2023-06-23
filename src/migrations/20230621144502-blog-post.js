'use strict';

module.exports = {
  up: createBlogPostsTable,
  down: dropBlogPostsTable
};

async function createBlogPostsTable(queryInterface, Sequelize) {
  await queryInterface.createTable('blog_posts', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      field: 'title',
    },
    content: {
      type: Sequelize.STRING,
      field: 'content',
    },
    user_id: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      }
    },
    published: {
      type: Sequelize.DATE,
      field: 'published',
    },
    updated: {
      allowNull: true,
      type: Sequelize.DATE,
      field: 'updated',
    }
  });
}

async function dropBlogPostsTable(queryInterface, _Sequelize) {
  await queryInterface.dropTable('blog_posts');
}
