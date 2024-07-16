"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsuarioRepository = require("../../CustomRepositories/UsuarioRepository");
var _apiErrors = require("../../helpers/api-errors");
class UpdateUsuarioUsecase {
  async execute({
    id,
    data
  }) {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    // const clienteRepository = new ClienteRe()
    const usuarioExiste = await usuarioRepository.getById({
      id
    });
    if (usuarioExiste) {
      throw new _apiErrors.ForBiddenError("Usuario Inválido!");
    }
    const updateUsuario = await usuarioRepository.update({
      id,
      data
    });
    return updateUsuario;
  }
}
var _default = exports.default = new UpdateUsuarioUsecase();