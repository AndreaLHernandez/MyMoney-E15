'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conceptsResources extends Model {
    static associate(models) {
      // define association here
      conceptsResources.belongsTo(models.concepts, {as: 'concepts', foreignKey: 'conceptId'});
      conceptsResources.belongsTo(models.resources, {as: 'resources', foreignKey: 'resourceId'});
    }
  }
  conceptsResources.init({
    conceptId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'conceptsResources',
  });
  return conceptsResources;
};