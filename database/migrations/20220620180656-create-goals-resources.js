'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goalsResources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "goals",
          key: "id",
        },
      },
      resourceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "resources",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('goalsResources');
  }
};