

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("duracaoSteps", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      stepId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "steps",
          key: "id",
        },
      },
      tipoVistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tipoVistos",
          key: "id",
        },
      },
      duracao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0

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
    await queryInterface.dropTable("duracaoSteps");
  },
};
