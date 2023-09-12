'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goalsResources extends Model {
    static associate(models) {
      // define association here
      goalsResources.belongsTo(models.goals, {as: 'goals', foreignKey: 'goalId'});
      goalsResources.belongsTo(models.resources, {as: 'resources', foreignKey: 'resourceId'});
    }
  }
  goalsResources.init({
    goalId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'goalsResources',
  });
  return goalsResources;
};