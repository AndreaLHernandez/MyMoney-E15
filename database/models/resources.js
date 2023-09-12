'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resources extends Model {
    static associate(models) {
      // define association here
      resources.belongsToMany(models.concepts, {
        through: models.conceptsResources,
        as: 'resources', 
        foreignKey: 'resourceId',
      });
      //relación  rompe el código 
       resources.belongsToMany(models.movements, {
        through: models.movementResources,
        as: 'resource', 
        foreignKey: 'resourceId',
      });
      resources.belongsToMany(models.goals, {
        through: models.goalsResources,
        as: 'resourcess', 
        foreignKey: 'resourceId',
      });

      
    }
  }
  resources.init({
    color: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'resources',
  });
  return resources;
};