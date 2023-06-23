'use strict';

module.exports = {
  up: createUsersTable,
  down: dropUsersTable
};

async function createUsersTable(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    displayName: {
      type: Sequelize.STRING,
      field: 'display_name',
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
    },
    password: {
      type: Sequelize.STRING,
      field: 'password',
    },
    image: {
      type: Sequelize.STRING,
      field: 'image',
    },
  });
}

async function dropUsersTable(queryInterface, _Sequelize) {
  await queryInterface.dropTable('users');
}
