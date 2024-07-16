"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _CreateFuncionarioUsecases = _interopRequireDefault(require("../../usecases/CreateFuncionarioUsecases"));
var _apiErrors = require("../../helpers/api-errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class CreateFuncionarioCotroller {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      dataNascimento: yup.date().required(),
      nif: yup.string().required(),
      genero: yup.string().required(),
      estadoCivil: yup.string().required(),
      datavalidadeNif: yup.date().required(),
      nacionalidade: yup.string().required(),
      endereco: yup.object({
        municipio: yup.string().required(),
        bairro: yup.string().required()
      }).required(),
      contacto: yup.object({
        telefone: yup.string().required(),
        email: yup.string().email().required()
      }),
      financa: yup.object({
        iban: yup.string().required(),
        salarioBruto: yup.string().required(),
        salarioPorDia: yup.string().required()
      }),
      contrato: yup.object({
        dataInicio: yup.string().required(),
        dataSaida: yup.string().required(),
        cargoId: yup.string().required()
      })
    });
    let inputValidation = true;
    try {
      await schema.validate(req.body);
    } catch (err) {
      console.error(req.body);
      inputValidation = false;
      const erro = err.errors[0];
      throw new _apiErrors.BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
    }
    const {
      nome,
      dataNascimento,
      nif,
      genero,
      datavalidadeNif,
      estadoCivil,
      nacionalidade,
      contacto,
      endereco,
      financa,
      contrato
    } = req.body;
    const {
      dataFim,
      dataInicio,
      cargoId
    } = contrato;
    const funcionario = await _CreateFuncionarioUsecases.default.execute({
      nome,
      dataNascimento,
      nif,
      genero,
      estadoCivil,
      nacionalidade,
      datavalidadeNif,
      contacto,
      endereco,
      financa,
      cargoId,
      contrato
    });
    return res.status(201).json({
      message: "Funcionário Registrados com sucesso!"
    });
  }
}
var _default = exports.default = new CreateFuncionarioCotroller();