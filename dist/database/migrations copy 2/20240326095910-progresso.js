"use strict";

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("progressoProcessos", {
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
          model: "steps",
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
          model: "processos",
          key: "id"
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "statusDeSteps",
          key: "id"
        }
      },
      responsavelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id"
        }
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
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
    await queryInterface.dropTable("progressoProcessos");
  }
};