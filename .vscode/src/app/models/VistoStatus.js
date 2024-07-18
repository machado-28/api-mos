/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";


class VistoStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        via: Sequelize.STRING,
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.Vistos, {
      foreignKey: "vistoId",
      as: "visto",
    });

    this.belongsTo(models.StatusDeVistos, {
      foreignKey: "statusId",
      as: "status",

    });
  }
}
export default VistoStatus;
