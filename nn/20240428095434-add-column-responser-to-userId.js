'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("vistos", "processoId", {

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
    await queryInterface.removeColumn("vistos", "processoId")
  }
};
