'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ficheiros", "tipoId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "tipoFicheiros",
        },
        key: 'id',

      }

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ficheiros", "tipoId")
  }
};
