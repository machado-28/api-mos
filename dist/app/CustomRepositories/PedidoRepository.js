"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PedidoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Pedidos = _interopRequireDefault(require("../models/Pedidos"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _TipoFicheiros = _interopRequireDefault(require("../models/TipoFicheiros"));
var _TipoPedidos = _interopRequireDefault(require("../models/TipoPedidos"));
var _TipoVistos = _interopRequireDefault(require("../models/TipoVistos"));
var _NumeroAleatorio = _interopRequireDefault(require("../utils/NumeroAleatorio"));
var _Vistos = _interopRequireDefault(require("../models/Vistos"));
var _sequelize = require("sequelize");
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PedidoRepository {
  async create({
    tipoVistoId,
    tipoId,
    requerenteId,
    statusId,
    vistoId
  }) {
    if (!(tipoVistoId || tipoId || requerenteId || fazeId)) throw new _apiErrors.BadRequestError("dados do pedido não foram recebidos pelo backend!");
    const numeroDeQuatroDigitos = (0, _NumeroAleatorio.default)();
    const numeroDoPedido = "MOS-PDD" + numeroDeQuatroDigitos + new Date().getFullYear();
    const pedidoNovo = await _Pedidos.default.create({
      numero: numeroDoPedido,
      tipoVistoId,
      requerenteId,
      tipoId,
      statusActualId: statusId,
      vistoId
    });
    return pedidoNovo;
  }
  async getAll() {
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll();
    return {
      total,
      pedidos
    };
  }
  async getAllByCliente({
    clientId
  }) {
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll();
    return {
      total,
      pedidos
    };
  }
  async getAllByDateAndStateAndCliente({
    dataInicio = new Date(),
    dataFim = new Date(),
    statusId,
    clientId
  }) {
    const dataInicioCustom = (0, _dateFns.startOfMonth)(new Date(dataInicio));
    const dataFimCustom = (0, _dateFns.endOfMonth)(new Date(dataFim));
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll({
      where: {
        createdAt: {
          [_sequelize.Op.between]: [dataInicioCustom, dataFimCustom]
        },
        statusId: statusId,
        requerenteId: clientId
      }
    });
    return {
      total,
      pedidos
    };
  }
  async getAllByTipoViso({
    tipoVistoId
  }) {
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll({
      where: {
        tipoVistoId
      }
    });
    return {
      total,
      pedidos
    };
  }
  async getAllByTipo({
    tipoId
  }) {
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll({
      where: {
        tipoId
      }
    });
    return {
      total,
      pedidos
    };
  }
  async getAllByProjecto({
    projectoId
  }) {
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll({
      where: {
        projectoId
      }
    });
    return {
      total,
      pedidos
    };
  }
  async getById({
    id
  }) {
    const pedido = await _Pedidos.default.findOne({
      where: {
        id
      }
    });
    return pedido;
  }
  async updateStatus({
    id,
    statusId,
    descricao
  }) {
    const pedidoExiste = await this.getById({
      id
    });
    if (!pedidoExiste) {
      throw new _apiErrors.NotFoundError("Pedido Id Nao encontrado");
    }
    await pedidoExiste.update({
      statusId,
      descricao
    });
    return true;
  }
  async getAllByDateAndState(dataInicio = new Date(), dataFim = new Date(), statusId) {
    const dataInicioCustom = (0, _dateFns.startOfMonth)(new Date(dataInicio));
    const dataFimCustom = (0, _dateFns.endOfMonth)(new Date(dataFim));
    const {
      count: total,
      rows: pedidos
    } = await _Pedidos.default.findAndCountAll({
      where: {
        createdAt: {
          [_sequelize.Op.between]: [dataInicioCustom, dataFimCustom]
        },
        statusId: statusId
      }
    });
    return {
      total,
      pedidos
    };
  }
}
exports.PedidoRepository = PedidoRepository;