/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class PedidoFazes extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.belongsTo(models.Fazes, {
      foreignKey: "fazeId",
      as: "faze",

    });
    this.belongsTo(models.Pedidos, {
      foreignKey: "pedidoId",
      as: "pedido",

    });
    this.belongsTo(models.StatusDePedidos, {
      foreignKey: "statusId",
      as: "status",

    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "funcionarioId",
      as: "funcionario",

    });
  }
}
export default PedidoFazes;
