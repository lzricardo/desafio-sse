'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.createTable('positions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.ENUM('active', 'disabled'),
          defaultValue: 'active'
        },
        max_hired: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } else {
      return Promise.resolve(null);
    }
  },
  down: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.dropTable('positions');
    } else {
      return Promise.resolve(null);
    }
  }
};