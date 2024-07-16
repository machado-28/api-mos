"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipoDeVistoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _TipoVistos = _interopRequireDefault(require("../models/TipoVistos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TipoDeVistoRepository {
  async validateById({
    id
  }) {
    const isValid = await _TipoVistos.default.findOne({
      id
    });
    console.log("RESUL", isValid);
    if (!isValid) return false;
    return true;
  }
  async getById({
    id
  }) {
    const tipoVisto = await _TipoVistos.default.findOne({
      where: {
        id
      }
    });
    return tipoVisto;
  }
  async getAll() {
    const tiposVisto = await _TipoVistos.default.findAll();
    return tiposVisto;
  }
  async update({
    id,
    nome,
    descricao,
    duracao,
    viaPermitida
  }) {
    const exisTipoVisto = await _TipoVistos.default.findOne({
      where: {
        id
      }
    });
    if (!exisTipoVisto) throw new _apiErrors.BadRequestError("tipo  de visto não encontrado");
    await exisTipoVisto.update({
      nome,
      descricao,
      duracao,
      viaPermitida
    });
    return exisTipoVisto;
  }
  async delete() {}
}
exports.TipoDeVistoRepository = TipoDeVistoRepository;