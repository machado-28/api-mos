/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model } = require("sequelize");


class Pedidos extends Model {
  static init(sequelize) {
    super.init(
      {

      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Requerentes, {
      foreignKey: "requerenteId",
      as: "requerente",
    });
    this.belongsTo(models.TipoVistos, {
      foreignKey: "tipoVistoId",
      as: "tipoVisto",
    });

    this.belongsTo(models.Vistos, {
      foreignKey: "vistoId",
      as: "visto",
    });

    this.belongsTo(models.TipoPedidos, {
      foreignKey: "tipoId",
      as: "tipo",
    });
    this.belongsToMany(models.StatusDePedidos, {
      foreignKey: "pedidoId",
      as: "pedidos",
      through: "fazeStatusDePedidos"
    });
  }


}
export default Pedidos;
