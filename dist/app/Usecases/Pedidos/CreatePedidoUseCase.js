"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PedidoRepository = require("../../CustomRepositories/PedidoRepository");
var _RequerenteRepository = require("../../CustomRepositories/RequerenteRepository");
var _TipoDePedidoRepository = require("../../CustomRepositories/TipoDePedidoRepository");
var _TipoDeVistoRepository = require("../../CustomRepositories/TipoDeVistoRepository");
var _apiErrors = require("../../helpers/api-errors");
var _Pedidos = _interopRequireDefault(require("../../models/Pedidos"));
var _Fazes = _interopRequireDefault(require("../../models/Fazes"));
var _sequelize = require("sequelize");
var _Usuarios = require("../../models/Usuarios");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pendente = 1;
class CreatePedidoUsecase {
  async execute({
    tipoVistoId,
    requerenteId,
    tipoId
  }) {
    console.log("requerente ID", requerenteId);
    const pedidoRepository = new _PedidoRepository.PedidoRepository();
    const tipoPedidoRepository = new _TipoDePedidoRepository.TipoDePedidoRepository();
    const tipoDePedidoExist = await tipoPedidoRepository.getById({
      id: tipoId
    });
    if (!tipoDePedidoExist) {
      throw new _apiErrors.NotFoundError("Id Tipo de pedido  não foi  encontrado!");
    }
    const tipoVistoRepository = new _TipoDeVistoRepository.TipoDeVistoRepository();
    const tipoVistoExist = await tipoVistoRepository.getById({
      id: tipoVistoId
    });
    if (!tipoVistoExist) {
      throw new _apiErrors.NotFoundError("Id  do Tipo de Visto não foi encontrado!");
    }
    const requerenteRepository = new _RequerenteRepository.RequerenteRepository();
    const requerenteExist = await requerenteRepository.getById({
      id: requerenteId
    });
    if (!requerenteExist) {
      throw new _apiErrors.NotFoundError("Id requerente não foi encontrado!");
    }
    const novoPedido = await pedidoRepository.create({
      tipoVistoId,
      tipoId: 1,
      requerenteId,
      statusId: pendente
    });
    const {
      id
    } = novoPedido;
    return novoPedido;
  }
}
var _default = exports.default = new CreatePedidoUsecase();