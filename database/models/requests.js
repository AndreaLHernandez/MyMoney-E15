'use strict';
const { request } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requests extends Model {
    static associate(models) {
      // define association here
      requests.belongsTo(models.users, {as: 'users', foreignKey: 'id'});
    }
  }
  requests.init({
    token: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requests',
  });
  return requests;
};