"use strict";

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProgressoHistoricos", {
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
          model: "Steps",
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
    await queryInterface.dropTable("ProgressoHistoricos");
  }
};