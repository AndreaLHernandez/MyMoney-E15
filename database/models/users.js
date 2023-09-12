'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.concepts, {as: 'concepts', foreignKey: 'userId'});
      users.hasMany(models.goals, {as: 'goals', foreignKey: 'userId'});
      users.hasMany(models.accounts, {as: 'accounts', foreignKey: 'userId'});
      users.hasMany(models.requests, {as: 'requests', foreignKey: 'userId'});
      users.hasOne(models.failedAttempts, {as: 'failedAttempts', foreignKey: 'userId'});
      users.hasMany(models.sessions, {as: 'sessions',foreignKey:'userId'});
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN,
    statusAct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};