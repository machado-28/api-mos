'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Ficheiros', [{
      name: 'metalica.png',
      path: "metalica.png",
      createdAt: new Date(),
      updatedAt: new Date()
    },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ficheiros', null, {});

  }
};
