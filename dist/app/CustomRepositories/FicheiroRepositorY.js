"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FicheiroRepository = void 0;
var _TipoFicheiros = _interopRequireDefault(require("../models/TipoFicheiros"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _apiErrors = require("../helpers/api-errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FicheiroRepository {
  async validateById({
    id
  }) {
    const isValid = await _Ficheiros.default.findOne({
      id
    });
    if (!isValid) return false;
    return true;
  }
  async create({
    path,
    name,
    tipoId,
    pedidoId,
    processoId
  }) {
    const ficheiroNovo = await _Ficheiros.default.create({
      path,
      name,
      tipoId,
      pedidoId,
      processoId
    });
    return ficheiroNovo;
  }
  async count({
    whereClause
  }) {
    const cliente = await _Ficheiros.default.count({
      where: whereClause
    });
    console.log("TOTAL=>", cliente);
    return {
      total: cliente
    };
  }
}
exports.FicheiroRepository = FicheiroRepository;