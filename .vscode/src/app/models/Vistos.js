/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import VistoStatus from "./VistoStatus";


class Vistos extends Model {
  static init(sequelize) {
    super.init(
      {
        emissora: Sequelize.STRING,
        descricao: Sequelize.STRING,
        expirado: Sequelize.BOOLEAN,
        cancelado: Sequelize.BOOLEAN,
        ativo: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.Requerentes, {
      foreignKey: "requerenteid",
      as: "requerente",
    });
    this.belongsToMany(models.StatusDeVistos, {
      foreignKey: "statusId",
      as: "status",
      through: VistoStatus
    });
  }
}
export default Vistos;
