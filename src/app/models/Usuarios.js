/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario: Sequelize.STRING,
        senha_hash: Sequelize.STRING,
        nome: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        telefone: Sequelize.STRING,
        email: Sequelize.STRING,

      },
      { sequelize }
    );
    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {

        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Painels, {
      foreignKey: "painelId",
      as: "painel",
    });
    this.belongsTo(models.Clientes, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    this.hasMany(models.Projectos, {
      foreignKey: "gestorInternoId",
      as: "projectos",
    });
    this.hasMany(models.Projectos, {
      foreignKey: "gestorExternoId",
      as: "projectosExternos",
    });
    this.hasMany(models.ProcessoFases, {
      foreignKey: "responsavelId",
      as: "responsavel",
    });
  }

  validarSenha(senha) {
    console.log(senha);
    return bcrypt.compareSync(senha.toString(), this.senha_hash);
  }
}
module.exports = Usuarios;
