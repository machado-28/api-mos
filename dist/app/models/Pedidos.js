"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FazesStatusDoPedidos = _interopRequireDefault(require("./FazesStatusDoPedidos"));
var _PedidoFazes = _interopRequireDefault(require("./PedidoFazes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const {
  Model
} = require("sequelize");
class Pedidos extends Model {
  static init(sequelize) {
    super.init({
      numero: Sequelize.STRING,
      descricao: Sequelize.STRING,
      fromSite: Sequelize.BOOLEAN
    }, {
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Requerentes, {
      foreignKey: "requerenteId",
      as: "requerente"
    });
    this.belongsTo(models.TipoPedidos, {
      foreignKey: "tipoId",
      as: "tipo"
    });
    this.belongsTo(models.TipoVistos, {
      foreignKey: "tipoVistoId",
      as: "tipoVisto"
    });
    this.belongsTo(models.StatusDePedidos, {
      foreignKey: "statusId",
      as: "status"
    });
    this.belongsTo(models.Vistos, {
      foreignKey: "vistoId",
      as: "visto"
    });

    // this.belongsTo(models.Processos, {
    //   foreignKey: "processoId",
    //   as: "processo",
    // });
  }
}
var _default = exports.default = Pedidos;