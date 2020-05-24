'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicant_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      position_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      situation: {
        allowNull: false,
        type: Sequelize.ENUM('assessing', 'hired', 'incompatible'),
        defaultValue: 'assessing'
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidatures');
  }
};