'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fazesStatusDoPedidos', [{
      statusId: 1,
      fazeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusId: 2,
      fazeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusId: 3,
      fazeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fazesStatusDoPedidos', null, {});

  }
};
