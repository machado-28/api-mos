"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListUsuarioUsecase = void 0;
var _UsuarioRepository = require("../../CustomRepositories/UsuarioRepository");
var _apiErrors = require("../../helpers/api-errors");
class ListUsuarioUsecase {
  async execute() {
    const usuarioRepository = new _UsuarioRepository.UsuarioRepository();
    const usuarios = await usuarioRepository.getAll();
    return usuarios;
  }
}
exports.ListUsuarioUsecase = ListUsuarioUsecase;
var _default = exports.default = new ListUsuarioUsecase();