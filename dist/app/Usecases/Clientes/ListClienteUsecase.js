"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListClienteUsecase = void 0;
var _ClienteRepository = require("../../CustomRepositories/ClienteRepository");
class ListClienteUsecase {
  async execute({
    whereClausule
  }) {
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const clientes = await clienteRepository.getAllCustom({
      whereClausule
    });
    return clientes;
  }
}
exports.ListClienteUsecase = ListClienteUsecase;
var _default = exports.default = new ListClienteUsecase();