"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumenentoRepository = void 0;
var _Documentos = _interopRequireDefault(require("../models/Documentos"));
var _TipoFicheiros = _interopRequireDefault(require("../models/TipoFicheiros"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _apiErrors = require("../helpers/api-errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DocumenentoRepository {
  async create({
    dataEmissao,
    dataValidade,
    numero,
    emissora,
    pedidoId,
    anexoId,
    requerenteId,
    tipoId
  }) {
    console.log("ITPO DOCUME", tipoId);
    const documentoNovo = await _Documentos.default.create({
      dataEmissao,
      dataValidade,
      numero,
      emissora,
      pedidoId,
      anexoId,
      requerenteId,
      tipoId
    });
    return documentoNovo;
  }
  async getOneByNumero({
    numero
  }) {
    const documento = await _Documentos.default.findOne({
      where: {
        numero
      },
      include: [{
        model: _Requerentes.default,
        as: "requerente"
      }, {
        model: _Ficheiros.default,
        as: "anexo"
      }]
    });
    return documento;
  }
  async getByPedidoId({
    pedidoId
  }) {
    if (!pedidoId) {
      throw new _apiErrors.BadRequestError("pedido Id nao recebido!");
    }
    const documentos = await _Documentos.default.findAll({
      where: {
        pedidoId
      },
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _TipoFicheiros.default,
        as: "tipo"
      }]
    });
    return documentos;
  }
  async update({
    id,
    numero,
    dataEmissao,
    dataValidade,
    ficheiroId
  }) {
    const existDocumento = await _Documentos.default.findOne({
      where: {
        id
      }
    });
    if (!existDocumento) throw new _apiErrors.BadRequestError("Documento não encontrado");
    await existDocumento.update({
      numero,
      dataEmissao,
      dataValidade,
      ficheiroId
    });
    return existDocumento;
  }
  async delete() {}
  async count({
    whereClause
  }) {
    const cliente = await _Documentos.default.count({
      where: whereClause
    });
    console.log("TOTAL=>", cliente);
    return {
      total: cliente
    };
  }
}
exports.DocumenentoRepository = DocumenentoRepository;