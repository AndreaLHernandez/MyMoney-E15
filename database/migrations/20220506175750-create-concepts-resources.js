'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conceptsResources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conceptId: {
        type: Sequelize.INTEGER,
        references: {
          model: "concepts",
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
    await queryInterface.dropTable('conceptsResources');
  }
};