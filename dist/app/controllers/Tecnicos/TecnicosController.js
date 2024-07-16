"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _apiErrors = require("../../helpers/api-errors");
var _CreateTecnicoUsecase = _interopRequireDefault(require("../../Usecases/Tecnico/CreateTecnicoUsecase.js"));
var _TecnicoRepository = require("../../CustomRepositories/TecnicoRepository");
var _buildWhereClause = _interopRequireDefault(require("../../utils/buildWhereClause"));
var _buildAttributesClause = _interopRequireDefault(require("../../utils/buildAttributesClause"));
var _Painels = _interopRequireDefault(require("../../models/Painels"));
var _Clientes = _interopRequireDefault(require("../../models/Clientes"));
var _Ficheiros = _interopRequireDefault(require("../../models/Ficheiros.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class TecnicosController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      avatarId: yup.string(),
      clienteId: yup.string(),
      email: yup.string().email().required(),
      telefone: yup.string().required()
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
      avatarId,
      clienteId,
      email,
      telefone
    } = req.body;
    await _CreateTecnicoUsecase.default.execute({
      nome,
      avatarId,
      clienteId,
      email,
      telefone
    });
    return res.status(201).json({
      message: "Tecnico Criado com sucesso!"
    });
  }
  async detail(req, res) {
    const id = req.sessao.id;
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    const usuarioExiste = await tecnicoRepository.getById({
      id
    });
    if (!usuarioExiste) {
      throw new _apiErrors.NotFoundError("Usuario invalido!");
    }
    return res.status(200).json({
      user: usuarioExiste
    });
  }
  async count() {
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    let query = (0, _buildWhereClause.default)(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total
    } = await tecnicoRepository.count({
      whereClause: query
    });
    return res.json({
      total
    });
  }
  async list(req, res) {
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    let query = (0, _buildWhereClause.default)(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total,
      tecnicos
    } = await tecnicoRepository.getAllCustom({
      whereClause: query,
      orderClause: [{
        orderBy,
        order
      }],
      attributes,
      includeClause: [{
        model: _Clientes.default,
        as: "cliente",
        attributes: ["id", "nome"]
      }, {
        model: _Ficheiros.default,
        as: "avatar",
        attributes: ["id", "path", "name", "url"]
      }]
    });
    return res.json({
      tecnicos,
      total
    });
  }
  async update(req, res) {
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    const {
      id
    } = req.params;
    const data = req.body;
    const cargo = await tecnicoRepository.update({
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
    const tecnicoRepository = new tecnicoRepository();
    const {
      id
    } = req.params;
    const cargo = await tecnicoRepository.delete({
      id
    });
    return res.status(200).json({
      message: "operacao realizada com sucesso",
      status: "ok",
      code: 200
    });
  }
}
var _default = exports.default = new TecnicosController();