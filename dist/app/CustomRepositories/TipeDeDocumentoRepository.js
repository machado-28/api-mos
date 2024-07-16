"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipoDeDocumentoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _TipoDocumentos = _interopRequireDefault(require("../models/TipoDocumentos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TipoDeDocumentoRepository {
  async getById({
    id
  }) {
    const tipoDocumento = await _TipoDocumentos.default.findOne({
      where: {
        id
      }
    });
    return tipoDocumento;
  }
  async getAll() {
    const tiposVisto = await _TipoDocumentos.default.findAll();
    return tiposVisto;
  }
  async update({
    id,
    nome,
    descricao,
    duracao,
    viaPermitida
  }) {
    const exisTipoDocumento = await _TipoDocumentos.default.findOne({
      where: {
        id
      }
    });
    if (!exisTipoDocumento) throw new _apiErrors.BadRequestError("tipo  de visto não encontrado");
    await exisTipoDocumento.update({
      nome,
      descricao,
      duracao,
      viaPermitida
    });
    return exisTipoDocumento;
  }
  async delete() {}
}
exports.TipoDeDocumentoRepository = TipoDeDocumentoRepository;