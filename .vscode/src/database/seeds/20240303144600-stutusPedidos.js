'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('statusDePedidos', [{
      nome: 'Recebido',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Tradução',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Legalização',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Submetido/Pendente',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Aprovado',
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
    {
      nome: 'Pendente',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statusDePedidos', null, {});

  }
};
