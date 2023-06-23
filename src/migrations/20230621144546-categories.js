'use strict';

module.exports = {
  up: createCategoriesTable,
  down: dropCategoriesTable
};

async function createCategoriesTable(queryInterface, Sequelize) {
  await queryInterface.createTable('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  });
}

async function dropCategoriesTable(queryInterface, _Sequelize) {
  await queryInterface.dropTable('categories');
}
