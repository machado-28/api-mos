"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsuarioRepository = require("../../CustomRepositories/UsuarioRepository");
var _apiErrors = require("../../helpers/api-errors");
class DeleteUsuarioUsecase {
  async execute({
    id
  }) {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    const usuarioExiste = await usuarioRepository.getById({
      id
    });
    if (usuarioExiste) {
      throw new _apiErrors.ForBiddenError("Usuario Inválido!");
    }
    const res = await usuarioRepository.delete({
      id
    });
    return res;
  }
}
var _default = exports.default = new DeleteUsuarioUsecase();