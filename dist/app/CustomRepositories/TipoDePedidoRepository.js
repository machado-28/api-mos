"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipoDePedidoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _TipoPedidos = _interopRequireDefault(require("../models/TipoPedidos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TipoDePedidoRepository {
  async getById({
    id
  }) {
    console.log("TIPO PEGADO!", id);
    const pedido = await _TipoPedidos.default.findOne({
      where: {
        id
      }
    });
    return pedido;
  }
  async getAll() {
    const tiposPedido = await _TipoPedidos.default.findAll();
    return tiposPedido;
  }
  async update({
    id,
    nome,
    descricao
  }) {
    if (!id) throw new _apiErrors.BadRequestError("id do tipo de Pedido nao foi encontrado!");
    const exisTipoPedido = await _TipoPedidos.default.findOne({
      where: {
        id
      }
    });
    if (!exisTipoPedido) throw new _apiErrors.BadRequestError(" Tipo de pedido não encontrado");
    await exisTipoPedido.update({
      nome,
      descricao,
      viaPermitida
    });
    return exisTipoPedido;
  }
  async delete() {}
}
exports.TipoDePedidoRepository = TipoDePedidoRepository;