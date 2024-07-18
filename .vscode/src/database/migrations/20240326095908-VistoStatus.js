const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vistoStatus", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      vistoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "vistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "statusDeVistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      via: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vistoStatus");
  },
};
