"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClienteRepository = require("../../CustomRepositories/ClienteRepository");
var _apiErrors = require("../../helpers/api-errors");
class DeleteClienteUsecase {
  async execute({
    id
  }) {
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const clienteExiste = await clienteRepository.getById({
      id
    });
    if (clienteExiste) {
      throw new _apiErrors.ForBiddenError("cliente Inválido!");
    }
    const res = await clienteRepository.delete({
      id
    });
    return res;
  }
}
var _default = exports.default = new DeleteUsuarioUsecase();