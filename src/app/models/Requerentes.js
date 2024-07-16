/* eslint-disable no-param-reassign */
import Sequelize, { Model } from "sequelize";
import "dotenv/config";


class Requerentes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        genero: Sequelize.STRING,
        dataNascimento: Sequelize.DATE,
        activo: Sequelize.BOOLEAN,
        estadoCivil: Sequelize.STRING,
        sindicato: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        telefone: Sequelize.STRING,
        nomePai: Sequelize.STRING,
        nomeMae: Sequelize.STRING,
        nacionalidadePai: Sequelize.STRING,
        nacionalidadeMae: Sequelize.STRING,

        passaporte: Sequelize.STRING,
        passaporteDataValidade: Sequelize.DATE,
        passaporteDataEmissao: Sequelize.DATE,
        passaporteLocalEmissao: Sequelize.STRING,

        profissao: Sequelize.STRING,
        funcao: Sequelize.STRING,

        enderecoEmpresa: Sequelize.STRING,
        emailEmpresa: Sequelize.STRING,
        telefoneEmpresa: Sequelize.STRING,
        nomeEmpresa: Sequelize.STRING,

      },
      { sequelize }
    );
    this.addHook("beforeSave", async (requerente) => {
      if (requerente.senha) {

        requerente.senha_hash = await bcrypt.hash(requerente.senha, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Ficheiros), {
      foreignKey: "requerenteId",
      as: "documentos",
    };
    this.hasMany(models.Pedidos, {
      foreignKey: "requerenteId",
      as: "pedidos",
    });
    this.belongsTo(models.Ficheiros, {
      foreignKey: "avatarId",
      as: "avatar",
    });
  }
  validarSenha(senha) {
    console.log(senha);
    return bcrypt.compareSync(senha.toString(), this.senha_hash);
  }
}
export default Requerentes;
