'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movementResources extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movementResources.belongsTo(models.resources, { as: "resources", foreignKey: "resourceId" });
      movementResources.belongsTo(models.movements, { as: "movements", foreignKey: "movementId" });
    }
  }
  movementResources.init({
    resourceId: DataTypes.INTEGER,
    movementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movementResources',
  });
  return movementResources;
};