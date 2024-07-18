

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pedidos", {
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
      tipoVistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "tipoVistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tipoPedidos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      vistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "vistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("pedidos");
  },
};
