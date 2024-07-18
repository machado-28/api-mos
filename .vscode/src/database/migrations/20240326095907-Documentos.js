const { DataTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      requerenteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "requerentes", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "tipoFicheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      anexoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "ficheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "pedidos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emissora: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        isUnique: true,
        type: Sequelize.STRING,
        allowNull: true,
      },
      dataEmissao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dataValidade: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("documentos");
  },
};
