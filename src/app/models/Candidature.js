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
        is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
        notEmpty: true,
      }
    },
    situation: {
      type: DataTypes.ENUM('assessing', 'hired', 'incompatible'),
      validate: {
        isIn: [['assessing', 'hired', 'incompatible']]
      }
    }
  }, {});
  Candidature.associate = function(models) {
    // associations can be defined here
  };
  return Candidature;
};