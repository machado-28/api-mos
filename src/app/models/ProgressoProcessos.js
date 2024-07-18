/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class ProgressoProcessos extends Model {
  static init(sequelize) {
    super.init(
      {

        // descricao: Sequelize.STRING,
        concluido_responsavel: Sequelize.BOOLEAN,
        concluido_responsavel_em: Sequelize.DATE,

        descricao: Sequelize.STRING
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.StatusDeSteps, {
      foreignKey: "statusId",
      as: "status",
    });

    this.belongsTo(models.Usuarios, {
      foreignKey: "responsavelId",
      as: "responsavel",
    });
    this.belongsTo(models.Steps, {
      foreignKey: "stepId",
      as: "step",
    });
    this.belongsTo(models.Processos, {
      foreignKey: "processoId",
      as: "processo",
    });

    this.belongsTo(models.Usuarios, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });

  }
}
export default ProgressoProcessos;
