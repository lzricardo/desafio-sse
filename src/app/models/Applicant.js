'use strict';
module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define('Applicant', {
    name: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'disabled'),
    email: DataTypes.STRING
  }, {});
  Applicant.associate = function(models) {
    // associations can be defined here
  };
  return Applicant;
};