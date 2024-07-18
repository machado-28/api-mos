

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fazesStatusDoPedidos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fazeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "fazes",
          key: "id",
        },

      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "statusDePedidos",
          key: "id",
        },

      },
      descricao: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("fazesStatusDoPedidos");
  },
};
