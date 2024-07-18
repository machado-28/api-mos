/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Ficheiros extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/ficheiros/${this.path}`;
          },
        },
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.hasOne(models.Documentos, {
      foreignKey: "anexoId",
      as: "documento",
    });

  }


}
export default Ficheiros;
