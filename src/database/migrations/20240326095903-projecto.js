

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projectos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      gestorInternoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Usuarios", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Usuarios", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      gestorExternoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Usuarios", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Clientes", key: "id" },
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
    await queryInterface.dropTable("Projectos");
  },
};
