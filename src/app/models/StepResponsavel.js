/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class StepResponsavel extends Model {
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
    this.belongsTo(models.Steps, {
      foreignKey: "stepId",
      as: "step",

    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "responsavelId",
      as: "responsavel",

    });
  }
}
export default StepResponsavel;
