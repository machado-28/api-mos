"use strict";

var _Funcionario = _interopRequireDefault(require("../../models/Funcionario"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FuncionarioMetodos {
  async listar() {}
  async listarPorDepartamento() {}
  async listarPorCargo() {}
  async detalharUm() {}
  async apagar() {}
  async actualizar() {}
  async validarPorId(id) {
    const funcionarioValido = await _Funcionario.default.findByPk(id);
    if (!funcionarioValido) return false;
    return true;
  }
}