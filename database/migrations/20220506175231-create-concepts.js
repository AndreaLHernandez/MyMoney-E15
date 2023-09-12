'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('concepts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('egreso','ingreso')
      },
      classification: {
        type: Sequelize.ENUM('fijo','variable')
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
    await queryInterface.dropTable('concepts');
  }
};