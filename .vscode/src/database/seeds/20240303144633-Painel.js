'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('painels', [{
      nome: 'Admin',
      descricao: "Administrador",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Sec',
      descricao: "Secretaria",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gv',
      descricao: "Gestor de Visto",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('painels', null, {});

  }
};
