'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Painels', [
      {
        nome: 'ADMINISTRADOR GERAL',
        descricao: "KIVEMBASOFT",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        nome: 'ADMINISTRADOR',
        descricao: "METALICA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'SECRETARIA',
        descricao: "SECRETARIA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'RECURSOS HUMANOS',
        descricao: "RECURSOS HUMANOS",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'GESTOR DE PROJECTO CLIENTE',
        descricao: "responsável de todos os processos de seus projectos  onde está inserido,no lado do cliente",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'GESTOR DE PROJECTO',
        descricao: "responsável de todos os processos de seus projectos  onde está inserido na, empresa",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'TECNICO DE PROCESSO',
        descricao: "responsável por tratar todos os processos, em faze especifica, a ele atribuido.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'VISUALISADOR',
        descricao: "visualizador e emissor de relatórios",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'ADMINISTRADOR DE PROJECTO',
        descricao: "responsável máximo da area de emissão de visto",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'CLIENTE',
        descricao: "administrador, representate da empresa cliente",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Painels', null, {});

  }
};
