'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    name: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive'),
    maxHired: DataTypes.INTEGER
  }, {});
  Position.associate = function(models) {
    // associations can be defined here
  };
  return Position;
};