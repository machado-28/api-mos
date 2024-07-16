

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("processosStatus", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      arquivado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      aprovado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      nota: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "sem comentario"
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendente",

      },
      processoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "processos",
          key: "id",
        },

      },

      reponsavelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },

      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("processosStatus");
  },
};
