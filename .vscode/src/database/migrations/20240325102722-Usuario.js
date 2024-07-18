

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
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
      usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatarId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "ficheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      painelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "painels", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      senha_hash: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("usuarios");
  },
};
