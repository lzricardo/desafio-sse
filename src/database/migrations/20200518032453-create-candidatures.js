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
        type: Sequelize.STRING
      },
      position_name: {
        type: Sequelize.STRING
      },
      situation: {
        allowNull: false,
        type: Sequelize.ENUM('assessing', 'hired', 'incompatible'),
        defaultValue: 'assessing'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidatures');
  }
};