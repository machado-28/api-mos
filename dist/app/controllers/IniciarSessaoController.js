"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var yup = _interopRequireWildcard(require("yup"));
require("./../../config/yup");
require("dotenv/config");
var _auth = _interopRequireDefault(require("../../config/auth"));
var _Usuarios = _interopRequireDefault(require("../models/Usuarios"));
var _apiErrors = require("../helpers/api-errors");
var _Painels = _interopRequireDefault(require("../models/Painels"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class IniciarSessaoController {
  async executar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      senha: yup.string().required()
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
      email,
      senha
    } = req.body;
    const usuarioExiste = await _Usuarios.default.findOne({
      where: {
        usuario: email
      },
      include: [{
        model: _Painels.default,
        as: "painel"
      }]
    });
    if (!usuarioExiste) {
      throw new _apiErrors.BadRequestError("usuario ou senha Incorrectos!");
    }
    if (!(await usuarioExiste.validarSenha(senha))) {
      return res.status(400).json({
        message: "usuario ou senha incorrecto!"
      });
    }
    const {
      painel,
      id,
      nome,
      clienteId,
      avatarUrl
    } = usuarioExiste;
    const token = _jsonwebtoken.default.sign({
      id,
      painel,
      clienteId,
      id,
      nome,
      avatarUrl
    }, _auth.default.secret, {
      expiresIn: _auth.default.expiresIn
    });
    return res.status(200).json({
      user: {
        id,
        painel,
        id,
        clienteId,
        nome,
        avatarUrl,
        token
      },
      statusCode: 200
    });
  }
}
var _default = exports.default = new IniciarSessaoController();