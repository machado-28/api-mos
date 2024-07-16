/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import FazeStatusDoProcessos from "./FazesStatusDoProcessos";

class StatusDeProcessos extends Model {
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
    this.belongsToMany(models.Processos, {
      foreignKey: "processoId",
      as: "processos",
      through: "fazeStatusDeProcessos"
    });

    this.belongsToMany(models.Fazes, {
      foreignKey: "statusId",
      as: "fazes",
      through: FazeStatusDoProcessos
    });
  }
}
export default StatusDeProcessos;
