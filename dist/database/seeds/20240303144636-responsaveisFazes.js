'use strict';

const {
  hashSync
} = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StepsResponsaveis', [{
      responsavelId: 8,
      stepId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      responsavelId: 9,
      stepId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      responsavelId: 10,
      stepId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StepsResponsaveis', null, {});
  }
};