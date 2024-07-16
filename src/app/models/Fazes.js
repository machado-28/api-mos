/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Fazes extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        nome: Sequelize.STRING,
        status: Sequelize.ENUM("Aprovado", "Recusado", "Cancelado", "Finalizado")
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
  }
}
export default Fazes;
