

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProcessoFases", {
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
          model: "Steps",
          key: "id",
        },
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      processoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Processos",
          key: "id",
        },
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "StatusDeSteps",
          key: "id",
        },
      },
      prazo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      responsavelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },

      dataInicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dataConclusao: {
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
    await queryInterface.dropTable("ProcessoFases");
  },
};
