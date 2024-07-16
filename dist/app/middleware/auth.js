"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _util = require("util");
var _auth = _interopRequireDefault(require("../../config/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable camelcase */
/* eslint-disable no-unreachable */
var _default = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      erro: "você precisa iniciar sessão!",
      status: 1234
    });
  }
  const [, token] = authHeader.split(" ");
  try {
    const decoded = await (0, _util.promisify)(_jsonwebtoken.default.verify)(token, _auth.default.secret || "Metalicaapp");
    const {
      id,
      painel,
      nome,
      clienteId,
      usuario,
      avatarUrl
    } = decoded;
    req.sessao = {
      id,
      painel,
      nome,
      usuario,
      avatarUrl,
      clienteId
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      error,
      authHeader
    });
  }
  return next();
};
exports.default = _default;