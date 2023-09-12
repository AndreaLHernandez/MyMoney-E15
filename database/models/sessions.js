"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sessions.belongsTo(models.users, { as: "users", foreignKey: "userId" });
    }
  }
  sessions.init(
    {
      refreshToken: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "sessions",
    }
  );
  return sessions;
};
