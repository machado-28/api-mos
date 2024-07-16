'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoPedidos', [{
      nome: 'Emissão de Visto',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Cancelamento de Visto',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Renovação de Visto',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TipoPedidos', null, {});
  }
};