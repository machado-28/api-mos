'use strict';

const {
  hashSync
} = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [{
      nome: 'Kivembasoft',
      usuario: "kivembasoft",
      senha_hash: hashSync("kivembasoft", 16),
      painelId: 1,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Metalica oil services',
      usuario: "admin@mos",
      senha_hash: hashSync("123456789", 16),
      painelId: 2,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Helena Secretaria Papel',
      usuario: "secretaria@mos",
      senha_hash: hashSync("123456789", 16),
      painelId: 3,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Antonio Gestor de Visto ',
      usuario: "gestorvisto@mos",
      senha_hash: hashSync("123456789", 16),
      painelId: 4,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Antonio  Machado',
      usuario: "rh@mos",
      senha_hash: hashSync("123456789", 16),
      painelId: 5,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "gpe@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 6,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "gpi@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 6,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "tp@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 7,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado 2',
      usuario: "tp2@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 7,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado 3',
      usuario: "tp3@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 7,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "v@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 8,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "ap@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 9,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'António Machado',
      usuario: "ap2@mos.com",
      senha_hash: hashSync("123456789", 16),
      painelId: 9,
      avatarId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};