"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Solicitante = _interopRequireDefault(require("../models/Solicitante"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ValidarSolicitante {
  async porId(id) {
    try {
      if (!id) return 0;
      const solicitanteExiste = await _Solicitante.default.findOne({
        where: {
          id
        }
      });
      if (!solicitanteExiste) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async porNumeroDoDocumentoDeViagem(numeroDocumentoViagem) {
    try {
      if (!nif) return 0;
      const solicitanteExiste = await _Solicitante.default.findOne({
        where: {
          numeroDocumentoViagem
        }
      });
      if (!solicitanteExiste) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
var _default = exports.default = new ValidarSolicitante();