/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class StatusDeVistos extends Model {
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
    this.belongsToMany(models.Vistos, {
      foreignKey: "vistoId",
      as: "visto",
      through: "vistoStatus"
    });
  }
}
export default StatusDeVistos;
