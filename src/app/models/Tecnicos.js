/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

class Tecnicos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        telefone: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {

    this.belongsTo(models.Clientes, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    this.belongsTo(models.Ficheiros, {
      foreignKey: "avatarId",
      as: "avatar",
    });

    this.hasMany(models.Processos, {
      foreignKey: "beneficiarioId",
      as: "processos",
    });
  }
}
module.exports = Tecnicos;
