"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _apiErrors = require("../../helpers/api-errors");
var _ProcessoRepository = require("../../CustomRepositories/ProcessoRepository");
var _Tecnicos = _interopRequireDefault(require("../../models/Tecnicos"));
var _Clientes = _interopRequireDefault(require("../../models/Clientes"));
var _Projectos = _interopRequireDefault(require("../../models/Projectos"));
var _CreateProcessoUseCase = _interopRequireDefault(require("../../Usecases/Processos/CreateProcessoUseCase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ProcessoController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      dataNascimento: yup.date().required(),
      genero: yup.string().required(),
      estadoCivil: yup.string().required(),
      nacionalidade: yup.string().required(),
      sindicato: yup.string().required(),
      mob: yup.date(),
      // nascimento: yup.object({
      //     pais: yup.string().required(),
      //     provincia: yup.string().required(),
      //     municipio: yup.string().required(),
      //     bairro: yup.string().required(),
      // }).required(),
      filiacao: yup.object({
        mae: yup.string().required(),
        pai: yup.string().required()
      }).required(),
      passaporte: yup.object({
        numero: yup.string().required(),
        dataEmissao: yup.string().required(),
        dataValidade: yup.string().required(),
        emissora: yup.string().required()
      }).required(),
      tipoVistoId: yup.number().required(),
      vistoId: yup.number(),
      projectoId: yup.number().required(),
      clienteId: yup.number().required(),
      beneficiarioId: yup.number().required(),
      tipoId: yup.number().required(),
      enderecoAngola: yup.object({
        provincia: yup.string().required(),
        cidade: yup.string().required()
      }).required()
    });
    let inputValidation = true;
    try {
      await schema.validate(req.body);
    } catch (err) {
      console.error(req.body);
      inputValidation = false;
      const erro = err.errors[0];
      throw new _apiErrors.BadRequestError(erro);
    }
    const {
      funcao,
      dataNascimento,
      genero,
      mob,
      estadoCivil,
      nacionalidade,
      filiacao,
      tipoId,
      vistoId,
      passaporte,
      projectoId,
      sindicato,
      clienteId,
      beneficiarioId,
      tipoVistoId,
      paisNascimento,
      enderecoAngola
    } = req.body;
    console.log("BODY REQUEST", req.body);
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    console.log("BEFORE EXECUTE", {
      dataNascimento,
      genero,
      funcao,
      tipoId,
      estadoCivil,
      nacionalidade,
      nomePai: filiacao?.mae,
      nomeMae: filiacao?.mae,
      maeNacionalidade: filiacao?.maeNacionalidade,
      paiNacionalidade: filiacao?.paiNacionalidade,
      vistoId: filiacao?.vistoId,
      mob,
      projectoId,
      sindicato,
      passaporteDataValidade: passaporte?.dataValidade,
      passaporteDataEmissao: passaporte?.dataEmissao,
      passaporteEmissora: passaporte?.emissora,
      passaporteNumero: passaporte?.numero,
      sindicato: filiacao?.sindicato,
      clienteId,
      beneficiarioId,
      funcao: filiacao?.funcao,
      paisNascimento,
      tipoVistoId
    });
    const processo = await _CreateProcessoUseCase.default.execute({
      dataNascimento,
      genero,
      funcao,
      tipoId,
      estadoCivil,
      nacionalidade,
      nomePai: filiacao?.mae,
      nomeMae: filiacao?.mae,
      maeNacionalidade: filiacao?.maeNacionalidade,
      paiNacionalidade: filiacao?.paiNacionalidade,
      vistoId: filiacao?.vistoId,
      mob,
      projectoId,
      sindicato,
      passaporteDataValidade: passaporte?.dataValidade,
      passaporteDataEmissao: passaporte?.dataEmissao,
      passaporteEmissora: passaporte?.emissora,
      passaporteNumero: passaporte?.numero,
      sindicato,
      clienteId,
      beneficiarioId,
      funcao,
      paisNascimento,
      tipoVistoId
    });
    return res.status(201).json({
      pedido,
      message: "Pedido Submetido com sucesso!!"
    });
  }
  async count(req, res) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    let query = buildWhereClause(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total
    } = await processoRepository.count({
      whereClause: query
    });
    return res.json({
      total
    });
  }
  async list(req, res) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      order,
      orderBy
    } = req.query;
    console.log("PARAMS", req.query);
    let attributes = [];
    const {
      processos,
      total
    } = await processoRepository.getAllCustom({
      whereClause: req.query,
      orderClause: [{
        orderBy,
        order
      }],
      attributes,
      includeClause: [{
        model: _Tecnicos.default,
        as: "beneficiario"
      }, {
        model: _Clientes.default,
        as: "cliente"
      }]
    });
    return res.status(200).json({
      processos,
      total,
      status: "ok",
      code: 200
    });
  }
  async getOne(req, res) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      id
    } = req.params;
    const processo = await processoRepository.getById({
      id
    });
    return res.status(200).json({
      processo,
      status: "ok",
      code: 200
    });
  }
  async update(req, res) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      id
    } = req.params;
    const data = req.body;
    const cargo = await processoRepository.update({
      id,
      data
    });
    return res.status(201).json({
      message: "operacao realizada com sucesso",
      status: "ok",
      code: 200
    });
  }
  async delete(req, res) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      id
    } = req.params;
    const cargo = await processoRepository.delete({
      id
    });
    return res.status(200).json({
      message: "operacao realizada com sucesso",
      status: "ok",
      code: 200
    });
  }
}
var _default = exports.default = new ProcessoController();