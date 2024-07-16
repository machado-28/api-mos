/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class DuracaoSteps extends Model {
  static init(sequelize) {
    super.init(
      {
        duracao: Sequelize.NUMBER,

      },
      { sequelize }
    );
    return this
  }
  static associate(models) {

    this.belongsTo(models.Steps, {
      foreignKey: "stepId",
      as: "step",
    });
    this.belongsTo(models.TipoDeVistos, {
      foreignKey: "tipoVistoId",
      as: "tipoVisto",
    });
  }
}
export default DuracaoSteps;
