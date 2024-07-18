

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Processos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      genero: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "M"
      },
      funcao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      consulado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estadoCivil: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidadeEndereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidadeProvincia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passaporteEmissora: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passaporteNumero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passaporteDataValidade: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      mob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      passaporteDataEmissao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nomeMae: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      maeNacionalidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paiNacionalidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paiNascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomePai: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "sem comentário"
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      requerente: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Clientes", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      submetidoPorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Usuarios", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "StatusDeSteps", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },


      beneficiarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Tecnicos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      tipoVistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "TipoVistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "TipoPedidos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      vistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Vistos", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      projectoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Projectos", key: "id" },
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
    await queryInterface.dropTable("Processos");
  },
};
