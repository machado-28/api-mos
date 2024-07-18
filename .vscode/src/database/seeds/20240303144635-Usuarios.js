
'use strict';
const { hashSync } = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Metalica Admin',
      usuario: "met_admin",
      senha_hash: hashSync("123456789", 16),
      painelId: 1,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Sec',
      usuario: "met_secretaria",
      senha_hash: hashSync("123456789", 16),
      painelId: 2,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gv',
      usuario: "met_gvisto",
      senha_hash: hashSync("123456789", 16),
      painelId: 3,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});

  }
};
