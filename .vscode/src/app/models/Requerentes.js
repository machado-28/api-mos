/* eslint-disable no-param-reassign */
import Sequelize, { Model} from "sequelize";
import "dotenv/config";


class Requerentes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        genero: Sequelize.STRING,
        dataNascimento: Sequelize.DATE,
        estadoCivil: Sequelize.STRING,
        sindicato: Sequelize.STRING,
        projecto: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        nomePai: Sequelize.STRING,
        nomeMae: Sequelize.STRING,
        nacionalidade: Sequelize.STRING,
        provinciaNascimento: Sequelize.STRING,
        municipioNascimento: Sequelize.STRING,
        bairroNascimento: Sequelize.STRING,
        cidadeNascimento: Sequelize.STRING,

      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.hasOne(models.Documentos);
    this.hasMany(models.Pedidos, {
      foreignKey: "requerenteId",
      as: "pedidos",
    });
  }

}
export default Requerentes;
