"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Contacto = _interopRequireDefault(require("../models/Contacto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ValidarContacto {
  async match(contacto) {
    try {
      const constactovalido = await _Contacto.default.findOne({
        where: {
          descricao: contacto
        }
      });
      if (!constactovalido) return false;
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
var _default = exports.default = new ValidarContacto();