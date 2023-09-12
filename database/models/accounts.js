'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      // define association here
      accounts.belongsTo(models.users, {as: 'users', foreignKey: 'userId'});
      accounts.hasMany(models.movements,{as: 'movements', foreignKey: 'accountId'});
    }
  }
  accounts.init({
    name: DataTypes.STRING,
    numberAccount: DataTypes.STRING,
    publicKey: DataTypes.STRING,
    typeAccount: DataTypes.ENUM('ahorro', 'nomina', 'efectivo', 'inversion', 'credito', 'wallet', 'departamental', 'vales'),
    CVE: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    cutoffDate: DataTypes.DATE,
    statusDelete: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};