'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('fazes', [{
      nome: 'Secretaria',
      descricao: "pedidos na secretaria",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'MIREMPET',
      descricao: "NO MIREMPET",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'SS7',
      descricao: "CANCELAMENTO",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'SME',
      descricao: "NO SME",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fazes', null, {});

  }
};
