'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('StatusDeSteps', [
      {
        nome: 'Pendente',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Aprovado',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'conluído',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Recusado',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cancelado',

        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StatusDeSteps', null, {});

  }
};
