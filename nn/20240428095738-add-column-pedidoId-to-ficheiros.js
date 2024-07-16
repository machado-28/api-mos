'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ficheiros", "pedidoId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "pedidos",
        },
        key: 'id',

      }

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ficheiros", "pedidoId")
  }
};
