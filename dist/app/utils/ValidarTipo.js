"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Aula_tipo = _interopRequireDefault(require("../models/Aula_tipo"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  response
} = require("express");
const {
  default: api
} = require("../../services/angola-api");
class ValidarTipo {
  async titulo(titulo) {
    const aula_tipoValida = await _Aula_tipo.default.findOne({
      where: {
        titulo: titulo
      }
    });
    console.log("Aula_tipo:", aula_tipoValida);
    s;
    if (!aula_tipoValida) return false;
    return true;
  }
  async id(id) {
    const aula_tipoValida = await _Aula_tipo.default.findOne({
      where: {
        id: id
      }
    });
    console.log("Aula_tipo:", aula_tipoValida);
    if (!aula_tipoValida) return false;
    return true;
  }
}
var _default = exports.default = new ValidarTipo();