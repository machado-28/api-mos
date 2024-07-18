/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Steps extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,

      },
      { sequelize }
    );
    return this
  }
  // static associate(models) {
  //   this.belongsTo(models.StatusDeSteps, {
  //     foreignKey: "statusId",
  //     as: "status",
  //   });
  // }
}
export default Steps;
