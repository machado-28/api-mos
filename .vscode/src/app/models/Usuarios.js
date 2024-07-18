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
  }

  validarSenha(senha) {
    console.log(senha);
    return bcrypt.compareSync(senha.toString(), this.senha_hash);
  }
}
module.exports = Usuarios;
