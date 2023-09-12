'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movements.belongsTo(models.concepts, {as: 'concepts', foreignKey: 'conceptId'});
      movements.belongsTo(models.accounts, {as: 'accounts', foreignKey: 'accountId'});
      movements.belongsTo(models.goals, {as: 'goals', foreignKey: 'goalId'});
      movements.belongsToMany(models.resources, {
        through: models.movementResources, 
        as: 'movements', 
        foreignKey: 'movementId',
      });
    }
  }
  movements.init({
    description: DataTypes.STRING,
    movementDate: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    conceptId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    typeMov: DataTypes.ENUM('ingreso','egreso','ahorro'),
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'movements',
  });
  return movements;
};