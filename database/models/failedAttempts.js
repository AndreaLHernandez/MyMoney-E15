'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class failedAttempts extends Model {
    static associate(models) {
      // define association here
      failedAttempts.belongsTo(models.users, {as: 'users', foreignKey: 'id'});
    }
  }
  failedAttempts.init({
    attempt: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    dateLogin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'failedAttempts',
  });
  return failedAttempts;
};