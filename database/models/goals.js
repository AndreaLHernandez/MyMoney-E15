'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goals extends Model {
    static associate(models) {
      // define association here
      goals.belongsTo(models.users, {as: 'users', foreignKey: 'userId'});
      goals.hasMany(models.movements,{as: 'movements', foreignKey: 'goalId'});
      goals.belongsToMany(models.resources, {
        through: models.goalsResources, 
        as: 'goals', 
        foreignKey: 'goalId',
      });
    }
  }
  goals.init({
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    period: DataTypes.ENUM('semanal','quincenal','mensual'),
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'goals',
  });
  return goals;
};