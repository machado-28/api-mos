"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _apiErrors = require("../../helpers/api-errors");
var _CreateUsuarioUsecase = _interopRequireDefault(require("../../Usecases/Usuario/CreateUsuarioUsecase"));
var _UsuarioRepository = require("../../CustomRepositories/UsuarioRepository");
var _buildWhereClause = _interopRequireDefault(require("../../utils/buildWhereClause"));
var _buildAttributesClause = _interopRequireDefault(require("../../utils/buildAttributesClause"));
var _mongoose = require("mongoose");
var _Painels = _interopRequireDefault(require("../../models/Painels"));
var _Clientes = _interopRequireDefault(require("../../models/Clientes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class GestoresController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      painelId: yup.string().required(),
      senha: yup.string().required().min(6),
      avatarId: yup.string(),
      clienteId: yup.string(),
      email: yup.string().email(),
      telefone: yup.string(),
      usuario: yup.string().required()
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
      usuario,
      senha,
      avatarId,
      clienteId,
      painelId,
      email,
      telefone
    } = req.body;
    await _CreateUsuarioUsecase.default.execute({
      nome,
      usuario,
      senha,
      avatarId,
      clienteId,
      painelId,
      email,
      telefone
    });
    return res.status(201).json({
      message: "Gestor Criado com sucesso!"
    });
  }
  async detail(req, res) {
    const id = req.sessao.id;
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    const usuarioExiste = await usuarioRepository.getById({
      id
    });
    if (!usuarioExiste) {
      throw new _apiErrors.NotFoundError("Usuario invalido!");
    }
    return res.status(200).json({
      user: usuarioExiste
    });
  }
  async count(req, res) {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    let query = (0, _buildWhereClause.default)(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total
    } = await usuarioRepository.count({
      whereClause: query
    });
    return res.json({
      total
    });
  }
  async list(req, res) {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    let query = (0, _buildWhereClause.default)(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total,
      usuario
    } = await usuarioRepository.getAllCustom({
      whereClause: query,
      orderClause: [{
        orderBy,
        order
      }],
      attributes,
      includeClause: [{
        model: _Painels.default,
        as: "painel",
        attributes: ["id", "nome"]
      }, {
        model: _Clientes.default,
        as: "cliente",
        attributes: ["id", "nome"]
      }]
    });
    return res.json({
      gestores: usuario,
      total
    });
  }
}
var _default = exports.default = new GestoresController();