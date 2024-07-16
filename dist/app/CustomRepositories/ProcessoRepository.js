"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Processos = _interopRequireDefault(require("../models/Processos"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _NumeroAleatorio = _interopRequireDefault(require("../utils/NumeroAleatorio"));
var _Vistos = _interopRequireDefault(require("../models/Vistos"));
var _CreateProcessoUseCase = _interopRequireDefault(require("../Usecases/Processos/CreateProcessoUseCase"));
var _Progressos = _interopRequireDefault(require("../models/Progressos"));
var _buildWhereClause = _interopRequireDefault(require("../utils/buildWhereClause"));
var _buildIncludeClause = _interopRequireDefault(require("../utils/buildIncludeClause"));
var _buildOrderClause = _interopRequireDefault(require("../utils/buildOrderClause"));
var _buildAttributesClause = _interopRequireDefault(require("../utils/buildAttributesClause"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProcessoRepository {
  async create({
    nome,
    dataNascimento,
    genero,
    estadoCivil,
    nacionalidade,
    nomePai,
    nomeMae,
    maeNacionalidade,
    paiNacionalidade,
    vistoId,
    cidadeEndereco,
    passaporteNumero,
    passaporteEmissora,
    passaporteDataValidade,
    passaporteDataEmissao,
    mob,
    dataValidade,
    tipoVistoId,
    tipoId,
    projectoId,
    dataEmissao,
    sindicato,
    funcao,
    clienteId,
    beneficiarioId,
    paisNascimento
  }) {
    const numeroDeQuatroDigitos = (0, _NumeroAleatorio.default)();
    const numeroDoProcesso = "MOS-PSS" + numeroDeQuatroDigitos + new Date().getFullYear();
    console.log("DATA RECEIVEB", {
      nome,
      dataNascimento,
      genero,
      estadoCivil,
      nacionalidade,
      nomePai,
      nomeMae,
      maeNacionalidade,
      paiNacionalidade,
      vistoId,
      cidadeEndereco,
      passaporteNumero,
      passaporteEmissora,
      passaporteDataValidade,
      passaporteDataEmissao,
      mob,
      dataValidade,
      tipoVistoId,
      tipoId,
      projectoId,
      dataEmissao,
      sindicato,
      funcao,
      clienteId,
      beneficiarioId,
      paisNascimento
    });
    const {
      id: processoId
    } = await _Processos.default.create({
      numero: numeroDoProcesso,
      nome,
      dataNascimento,
      genero,
      estadoCivil,
      nacionalidade,
      nomePai,
      nomeMae,
      maeNacionalidade,
      paiNacionalidade,
      vistoId,
      cidadeEndereco,
      passaporteNumero,
      passaporteEmissora,
      passaporteDataValidade,
      passaporteDataEmissao,
      mob,
      dataValidade,
      tipoVistoId,
      tipoId,
      projectoId,
      dataEmissao,
      sindicato,
      funcao,
      clienteId,
      beneficiarioId,
      paisNascimento
    });
    await _Progressos.default.create({
      processoId,
      clienteId,
      statusId: 1,
      stepId: 1
    });
    return true;
  }
  async getAllCustom({
    whereClause,
    orderClause,
    includeClause,
    attributesClause,
    attributes
  }) {
    const {
      rows: processos,
      count: total
    } = await _Processos.default.findAndCountAll({
      where: (0, _buildWhereClause.default)(whereClause),
      include: (0, _buildIncludeClause.default)(includeClause),
      order: [(0, _buildOrderClause.default)(orderClause)],
      attributes: (0, _buildAttributesClause.default)(attributes)
    });
    return {
      processos,
      total
    };
  }
  async count({
    whereClause
  }) {
    const processos = await _Processos.default.count({
      where: whereClause
    });
    console.log("TOTAL=>", processos);
    return {
      total: processos
    };
  }
}
exports.ProcessoRepository = ProcessoRepository;