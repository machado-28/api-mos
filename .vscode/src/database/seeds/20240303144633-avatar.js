'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('ficheiros', [{
      name: 'metalica.png',
      path: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ficheiros', null, {});

  }
};
