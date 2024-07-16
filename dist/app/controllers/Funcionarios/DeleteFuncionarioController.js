"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FuncionarioReposoitory = require("../../CustomRepositories/FuncionarioReposoitory");
class DeleteFuncioanarioController {
  async execute(req, res) {
    const {
      id
    } = req.params;
    const funcionarioRepository = new _FuncionarioReposoitory.FuncionarioRepository();
    await funcionarioRepository.delete();
    return res.status(200).json({
      funcionarios,
      total
    });
  }
}
var _default = exports.default = new DeleteFuncioanarioController();