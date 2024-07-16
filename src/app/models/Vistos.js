/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import VistoStatus from "./VistoStatus";


class Vistos extends Model {
  static init(sequelize) {
    super.init(
      {
        expirado: Sequelize.BOOLEAN,
        cancelado: Sequelize.BOOLEAN,
        numero: Sequelize.STRING,
        dataEmissao: Sequelize.DATE,
        dataValidade: Sequelize.DATE
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.Pedidos, {
      foreignKey: "processoId",
      as: "processo",
    });
    this.belongsTo(models.Ficheiros, {
      foreignKey: "anexoId",
      as: "anexo",
    });
    this.belongsTo(models.TipoVistos, {
      foreignKey: "tipoId",
      as: "tipo",
    });
    this.belongsTo(models.StatusDeVistos, {
      foreignKey: "statusId",
      as: "statusActual",
      default:1
    });
    this.belongsToMany(models.StatusDeVistos, {
      foreignKey: "statusId",
      as: "status",
      through: VistoStatus
    });
  }
}
export default Vistos;
