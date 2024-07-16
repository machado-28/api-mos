"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Funcionario = _interopRequireDefault(require("../models/Funcionario"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ValidarFuncionario {
  async porId(id) {
    try {
      if (!id) return 0;
      const funcionarioExiste = await _Funcionario.default.findOne({
        where: {
          id
        }
      });
      if (!funcionarioExiste) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
var _default = exports.default = new ValidarFuncionario();