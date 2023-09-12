'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numberAccount: {
        type: Sequelize.STRING
      },
      publicKey: {
        type: Sequelize.STRING
      },
      typeAccount: {
        type: Sequelize.ENUM('ahorro', 'nomina', 'efectivo', 'inversion', 'credito', 'wallet', 'departamental', 'vales')
      },
      CVE: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cutoffDate: {
        type: Sequelize.DATE
      },
      statusDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('accounts');
  }
};