"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Usuario = _interopRequireDefault(require("../models/Usuario"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ValidarUsuario {
  async porId(id) {
    try {
      if (!id) return 0;
      const funcionarioExiste = await _Usuario.default.findOne({
        where: {
          id
        }
      });
      if (!usuarioExiste) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async porNif(nif) {
    try {
      if (!nif) return 0;
      const usuarioExiste = await _Usuario.default.findOne({
        where: {
          nif
        }
      });
      if (!usuarioExiste) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
var _default = exports.default = new ValidarUsuario();