"use strict";

/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("processos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      funcao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sindicato: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estadoCivil: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cidadeEndereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cidadeProvincia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passaporteEmissora: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passaporteNumero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passaporteDataValidade: {
        type: Sequelize.DATE,
        allowNull: false
      },
      mob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      passaporteDataEmissao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      nomeMae: {
        type: Sequelize.STRING,
        allowNull: true
      },
      maeNacionalidade: {
        type: Sequelize.STRING,
        allowNull: true
      },
      paiNacionalidade: {
        type: Sequelize.STRING,
        allowNull: true
      },
      paiNascimento: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nomePai: {
        type: Sequelize.STRING,
        allowNull: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "sem comentário"
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      requerente: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "clientes",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      beneficiarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tecnicos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      tipoVistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tipoVistos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipoPedidos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      vistoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "vistos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      projectoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "projectos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("processos");
  }
};