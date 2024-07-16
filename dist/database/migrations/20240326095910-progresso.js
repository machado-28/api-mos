"use strict";

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProgressoProcessos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      stepId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Steps",
          key: "id"
        }
      },
      concluido_responsavel: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      concluido_responsavel_em: {
        type: Sequelize.DATE,
        allowNull: true
      },
      processoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Processos",
          key: "id"
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "StatusDeSteps",
          key: "id"
        }
      },
      responsavelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Usuarios",
          key: "id"
        }
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Usuarios",
          key: "id"
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProgressoProcessos");
  }
};