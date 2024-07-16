"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Usuario = _interopRequireDefault(require("../models/Usuario"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function CadastrarUsuario(nome, dataNascimento, isAdmin, genero, estadoCivil) {
  try {
    const usuario = await _Usuario.default.create({
      nome,
      dataNascimento,
      isAdmin,
      genero,
      estadoCivil
    });
    return usuario;
  } catch (error) {
    console.log(error);
    return {};
  }
}
var _default = exports.default = CadastrarUsuario;