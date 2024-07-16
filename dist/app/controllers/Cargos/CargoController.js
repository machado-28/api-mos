"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _apiErrors = require("../../helpers/api-errors");
var yup = _interopRequireWildcard(require("yup"));
var _createCargoUseCases = _interopRequireDefault(require("../../usecases/createCargoUseCases"));
var _CargosRepository = require("../../CustomRepositories/CargosRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class DepartamentoController {
  async create(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      departamentoId: yup.date().required()
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
      departamentoId
    } = req.body;
    const cargo = await _createCargoUseCases.default.execute({
      nome,
      departamentoId
    });
    return res.status(201).json({
      message: "Cargo Criado com sucesso!"
    });
  }
  async list(req, res) {
    const cargosRepository = new _CargosRepository.CargosRepository();
    const {
      cargos,
      total
    } = await cargosRepository.getAll();
    return res.status(200).json({
      cargos,
      total
    });
  }
  async getOne(req, res) {
    const cargosRepository = new _CargosRepository.CargosRepository();
    const {
      id
    } = req.params;
    const cargo = await cargosRepository.getById({
      id
    });
    return res.status(200).json({
      cargo
    });
  }
}
var _default = exports.default = new DepartamentoController();