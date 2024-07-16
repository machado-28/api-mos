"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusDePedidoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _StatusDePedidos = _interopRequireDefault(require("../models/StatusDePedidos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class StatusDePedidoRepository {
  async getById({
    id
  }) {
    const statusDePedido = await _StatusDePedidos.default.findOne({
      where: {
        id
      }
    });
    return statusDePedido;
  }
  async getAll() {
    const statusPedido = await _StatusDePedidos.default.findAll();
    return statusPedido;
  }
  async update({
    id,
    nome,
    descricao
  }) {
    const exisStatusPedido = await _StatusDePedidos.default.findOne({
      where: {
        id
      }
    });
    if (!exisStatusPedido) throw new _apiErrors.BadRequestError("status id do processo não encontrado");
    await exisStatusPedido.update({
      nome,
      descricao
    });
    return exisStatusPedido;
  }
  async delete() {}
}
exports.StatusDePedidoRepository = StatusDePedidoRepository;