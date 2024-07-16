/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Painels extends Model {
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
    this.hasMany(models.Usuarios, {
      foreignKey: "id",
      as: "usuarios",
    });
  }
}
export default Painels;
