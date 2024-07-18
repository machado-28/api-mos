/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { DataTypes, INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class ProcessoFases extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        processoId: DataTypes.INTEGER,
        stepId: DataTypes.INTEGER,
        responsavelId: DataTypes.INTEGER,
        prazo: DataTypes.INTEGER,
        statusId: DataTypes.INTEGER,
        dataInicio: DataTypes.DATE,
        dataConclusao: DataTypes.DATE,
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {

    this.belongsTo(models.Processos, {
      foreignKey: "processoId",
      as: "processo",
    });

    this.belongsTo(models.Steps, {
      foreignKey: "stepId",
      as: "step",
    });

    this.belongsTo(models.StatusDeSteps, {
      foreignKey: "statusId",
      as: "status",
    });

    this.belongsTo(models.Usuarios, {
      foreignKey: "responsavelId",
      as: "responsavel",
    });

  }
}
export default ProcessoFases;
