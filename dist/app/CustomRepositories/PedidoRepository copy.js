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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PedidoRepository {
  async validadteById({
    id
  }) {
    const pedido = await _Pedidos.default.findOne({
      where: {
        id
      }
    });
    if (!pedido) return false;
    return true;
  }
  async getById({
    id
  }) {
    const pedido = await _Pedidos.default.findOne({
      where: {
        id
      },
      include: [{
        model: _Requerentes.default,
        as: "requerente"
      }, {
        model: _TipoPedidos.default,
        as: "tipo"
      }, {
        model: _TipoVistos.default,
        as: "tipoVisto"
      }, {
        association: "documentos",
        include: [{
          model: _Ficheiros.default,
          as: "anexo"
        }, {
          model: _TipoFicheiros.default,
          as: "tipo"
        }]
      }]
    });
    return pedido;
  }
  async getAll() {
    const {
      rows: pedidos,
      count: total
    } = await _Pedidos.default.findAndCountAll({
      where: {
        id
      },
      include: [{
        model: _Requerentes.default,
        as: "requerente"
      }, {
        model: _TipoPedidos.default,
        as: "tipo"
      }, {
        model: _TipoVistos.default,
        as: "tipoVisto"
      }, {
        model: _Vistos.default,
        as: "visto"
      }, {
        association: "documentos",
        include: [{
          model: _Ficheiros.default,
          as: "anexo"
        }, {
          model: _TipoFicheiros.default,
          as: "tipo"
        }]
      }]
    });
    return {
      pedidos,
      total
    };
  }
  async update({
    statusId
  }) {
    const usuarioExiste = await this.getById;
    if (!usuarioExiste) throw new _apiErrors.NotFoundError("usuario invalido");
    const actualizado = await usuarioExiste.update({
      nome,
      painel,
      usuario,
      avatarId
    });
    return actualizado;
  }
  async getAllByStatusId({
    tipoId,
    statusId
  }) {
    const {
      rows: pedidos,
      count: total
    } = await _Pedidos.default.findAndCountAll({
      where: {
        tipoId,
        statusId
      },
      include: [{
        model: _Requerentes.default,
        as: "requerente"
      }, {
        model: _TipoPedidos.default,
        as: "tipo"
      }, {
        model: _TipoVistos.default,
        as: "tipoVisto"
      }, {
        model: _Vistos.default,
        as: "visto"
      }, {
        association: "documentos",
        include: [{
          model: _Ficheiros.default,
          as: "anexo"
        }, {
          model: _TipoFicheiros.default,
          as: "tipo"
        }]
      }]
    });
    return {
      pedidos,
      total
    };
  }
  async getByFaze({
    fazeId
  }) {
    const {
      rows: pedidos,
      count: total
    } = await _Pedidos.default.findAndCountAll({
      where: {
        fazeId
      },
      include: [{
        model: _Requerentes.default,
        as: "requerente"
      }, {
        model: _TipoPedidos.default,
        as: "tipo"
      }, {
        model: _TipoVistos.default,
        as: "tipoVisto"
      }, {
        model: _Vistos.default,
        as: "visto"
      }, {
        association: "documentos",
        include: [{
          model: _Ficheiros.default,
          as: "anexo"
        }, {
          model: _TipoFicheiros.default,
          as: "tipo"
        }]
      }]
    });
    return {
      pedidos,
      total
    };
  }
  async create({
    tipoVistoId,
    tipoId,
    requerenteId,
    statusId,
    fazeId,
    vistoId
  }) {
    if (!(tipoVistoId || tipoId || requerenteId || fazeId)) throw new _apiErrors.BadRequestError("dados do pedido não foram recebidos pelo backend!");
    const numeroDeQuatroDigitos = (0, _NumeroAleatorio.default)();
    const numeroDoPedido = "MOS-" + numeroDeQuatroDigitos + new Date().getFullYear();
    const pedidoNovo = await _Pedidos.default.create({
      numero: numeroDoPedido,
      tipoVistoId,
      requerenteId,
      tipoId,
      fazeActualId: fazeId,
      statusActualId: statusId,
      vistoId
    });
    return pedidoNovo;
  }
}
exports.PedidoRepository = PedidoRepository;