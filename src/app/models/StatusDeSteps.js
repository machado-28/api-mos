/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import FazeStatusDoProcessos from "./FazesStatusDoProcessos";

class StatusDeSteps extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,

      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.hasMany(models.ProcessoFases, {
      foreignKey: "statusId",
      as: "processos",
    });
  }
}
export default StatusDeSteps;
