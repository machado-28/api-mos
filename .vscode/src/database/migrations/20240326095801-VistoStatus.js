

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
        allowNull: true,
        references: {
          model: "vistos",
          key: "id",
        },
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "statusDeVistos",
          key: "id",
        },
      },
      via: {
        type: Sequelize.INTEGER,
        allowNull: false,

        primaryKey: true,
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
