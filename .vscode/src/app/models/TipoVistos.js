/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class TipoVistos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
      },
      { sequelize }
    );
    return this
  }

}
export default TipoVistos;
