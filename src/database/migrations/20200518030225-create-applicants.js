'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    if (process.env.TEST_RUN_MIGRATIONS_AND_SEEDERS === 'true') {
      return queryInterface.createTable('applicants', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.ENUM('active', 'inactive'),
          defaultValue: 'active'
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
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
      return queryInterface.dropTable('applicants');
    } else {
      return Promise.resolve(null);
    }
  }
};