'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoVistos', [{
      nome: 'Turismo',
      duracao: 2,
      renovacaoPermitida: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Trabalho',
      duracao: 2,
      renovacaoPermitida: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Curta Duração',
      duracao: 2,
      renovacaoPermitida: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Fronteira',
      duracao: 3,
      renovacaoPermitida: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TipoVistos', null, {});
  }
};