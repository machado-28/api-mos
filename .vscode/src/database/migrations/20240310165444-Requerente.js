

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("requerentes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      municipioNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      provinciaNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairroNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidadeNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      paisNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sindicato: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estadoCivil: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomePai: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomeMae: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projecto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fotoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refences: { model: "ficheiros", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("requerentes");
  },
};
