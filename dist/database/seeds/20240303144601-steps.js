'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Steps', [{
      nome: 'pendente',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'tradução',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'legalização',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'SME',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'MIREMPET',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Finalizado',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Steps', null, {});
  }
};