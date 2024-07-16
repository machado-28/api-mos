'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('TipoFicheiros', [{
      nome: 'Passaporte',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Foto (Passe)',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      nome: 'Compromisso de honra',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Atestado Médico',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Certificado de Habilitação',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Contrato de trabalho',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Registo Criminal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Currículumn Vitae',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Certificado de Vacinação da Febre Amarela',
      createdAt: new Date(),
      updatedAt: new Date()
    },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TipoFicheiros', null, {});

  }
};
