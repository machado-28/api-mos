/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import ProjectosTipoVistos from "./ProjectosTipoVistos";

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
  static associate(models) {
    this.belongsToMany(models.Projectos, {
      foreignKey: "tipoVistoId",
      as: "projectos",
      through: ProjectosTipoVistos
    });

  }

}
export default TipoVistos;
