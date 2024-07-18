const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vistos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "tipoVistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      anexoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refences: { model: "ficheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      expirado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      cancelado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable("vistos");
  },
};
