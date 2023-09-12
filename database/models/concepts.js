'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class concepts extends Model {
    static associate(models) {
      // define association here
      concepts.belongsTo(models.users, {as: 'users', foreignKey: 'userId'});
      concepts.belongsToMany(models.resources, {
        through: models.conceptsResources, 
        as: 'conceptos', 
        foreignKey: 'conceptId',
      });
      concepts.hasMany(models.movements, {as: 'movements', foreignKey: 'conceptId'});
    }
  }
  concepts.init({
    description: DataTypes.STRING,
    type: DataTypes.ENUM('egreso','ingreso'),
    classification: DataTypes.ENUM('fijo','variable'),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'concepts',
  });
  return concepts;
};