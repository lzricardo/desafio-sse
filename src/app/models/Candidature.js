'use strict';
module.exports = (sequelize, DataTypes) => {
  const Candidature = sequelize.define('Candidature', {
    applicant_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    position_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isAlpha: true
      }
    },
    situation: {
      type: Sequelize.ENUM('assessing', 'hired', 'incompatible'),
      isIn: [['assessing', 'hired', 'incompatible']]
    }
  }, {});
  Candidature.associate = function(models) {
    // associations can be defined here
  };
  return Candidature;
};