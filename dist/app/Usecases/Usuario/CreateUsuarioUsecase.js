"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsuarioRepository = require("../../CustomRepositories/UsuarioRepository");
var _apiErrors = require("../../helpers/api-errors");
class CreateUsuarioUsecase {
  async execute({
    nome,
    usuario,
    senha,
    avatarId,
    clienteId,
    painelId,
    email,
    telefone
  }) {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    // const clienteRepository = new ClienteRe()
    const usuarioExiste = await usuarioRepository.getAllCustom({
      whereClause: {
        usuario,
        email,
        telefone
      }
    });
    if (usuarioExiste.total > 0) {
      throw new _apiErrors.ForBiddenError("Usuario Inválido!");
    }
    const novoUsuario = await usuarioRepository.create({
      nome,
      usuario,
      senha,
      avatarId,
      clienteId,
      email,
      telefone,
      painelId
    });
    return novoUsuario;
  }
}
var _default = exports.default = new CreateUsuarioUsecase();