/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Progressos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        concluido_responsavel: Sequelize.BOOLEAN,
        concluido_responsavel_em: Sequelize.DATE,
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

    this.belongsTo(models.Usuarios, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });

  }
}
export default Progressos;
