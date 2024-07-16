"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DocumentosRepository = require("../../CustomRepositories/DocumentosRepository");
var _PedidoRepository = require("../../CustomRepositories/PedidoRepository");
var _RequerenteRepository = require("../../CustomRepositories/RequerenteRepository");
var _TipoDePedidoRepository = require("../../CustomRepositories/TipoDePedidoRepository");
var _TipoDeVistoRepository = require("../../CustomRepositories/TipoDeVistoRepository");
var _apiErrors = require("../../helpers/api-errors");
var _Documentos = _interopRequireDefault(require("../../models/Documentos"));
var _Pedidos = _interopRequireDefault(require("../../models/Pedidos"));
var _Fazes = _interopRequireDefault(require("../../models/Fazes"));
var _sequelize = require("sequelize");
var _Usuarios = require("../../models/Usuarios");
var _socketio = require("../../../socketio");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const activo = 1;
const pedidoDeEmissaoId = 1;
class CreatePedidoDeEmissaoUsecase {
  async execute({
    tipoVistoId,
    requerenteId,
    fazeId
  }) {
    console.log("requerente ID", requerenteId);
    const pedidoRepository = new _PedidoRepository.PedidoRepository();
    const tipoPedidoRepository = new _TipoDePedidoRepository.TipoDePedidoRepository();
    const tipoDePedidoExist = await tipoPedidoRepository.getById({
      id: pedidoDeEmissaoId
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
      fazeId,
      requerenteId,
      statusId: activo
    });
    const {
      id
    } = novoPedido;
    const faze = await _Fazes.default.findOne({
      where: {
        id: 1
      }
    });
    if (faze) {
      // Adiciona a fase ao pedido e associa uma descrição usando o método `addFazes`
      const res = await novoPedido.addFazes(faze, {
        through: {
          statusId: activo,
          descricao: "Fase Inicial"
        }
      });
      console.log(res);
    } else {
      throw new _apiErrors.BadRequestError("Faze ID Nao Encontrada");
      console.error("Fase não encontrada");
    }

    // Passa o ID da fase e a descrição como um array de objetos

    // const query = `INSERT INTO PedidoFazes (fazeId, pedidoId) VALUES (6, ${novoPedido.id})`;

    // // Execute a consulta SQL com o ID numérico do pedido
    // // Certifique-se de substituir 6 pelo ID da fase apropriado

    // const result = await sequelize.query(query)
    // return result

    (0, _socketio.sendMessage)({
      data: {
        message: `um pedido foi agendado pelo usuario,${req.sessao?.usuario?.nome},\n Pedido:${novo}`
      }
    });
    return novoPedido;
  }
}
var _default = exports.default = new CreatePedidoDeEmissaoUsecase();