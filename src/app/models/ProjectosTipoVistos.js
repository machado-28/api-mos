/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";


class ProjectosTipoVistos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.TipoVistos, {
      foreignKey: "TipoVistoId",
      as: "tipoVisto",

    });
    this.belongsTo(models.Projectos, {
      foreignKey: "projectoId",
      as: "projecto",

    });


  }
}
export default ProjectosTipoVistos;
