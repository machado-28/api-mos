import FazesStatusDoPedidos from "./FazesStatusDoPedidos";
import PedidoFazes from "./PedidoFazes";

/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model } = require("sequelize");


class Pedidos extends Model {
  static init(sequelize) {
    super.init(
      {
        numero: Sequelize.STRING,
        descricao: Sequelize.STRING,
        fromSite: Sequelize.BOOLEAN,
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
    this.belongsTo(models.TipoPedidos, {
      foreignKey: "tipoId",
      as: "tipo",
    });
    this.belongsTo(models.TipoVistos, {
      foreignKey: "tipoVistoId",
      as: "tipoVisto",
    });

    this.belongsTo(models.StatusDePedidos, {
      foreignKey: "statusId",
      as: "status",
    });

    this.belongsTo(models.Vistos, {
      foreignKey: "vistoId",
      as: "visto",
    });

    // this.belongsTo(models.Processos, {
    //   foreignKey: "processoId",
    //   as: "processo",
    // });

  }


}
export default Pedidos;
