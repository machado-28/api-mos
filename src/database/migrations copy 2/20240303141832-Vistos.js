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
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descrcao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anexoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refences: { model: "ficheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      dataEmissao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataEmissao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataValidade: {
        type: Sequelize.DATE,
        allowNull: false,
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
