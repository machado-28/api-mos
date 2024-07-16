"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
var _PedidoRepository = require("../../CustomRepositories/PedidoRepository");
var _apiErrors = require("../../helpers/api-errors");
class CreateProjectoUsecase {
  async execute({
    nome,
    clienteId,
    gestorExternoId,
    gestorInternoId
  }) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const projectoExiste = await projectoRepository.getByName({
      nome,
      clienteId
    });
    if (projectoExiste) {
      throw new _apiErrors.UnAuthoriazedError("Projecto já existe!");
    }
    const novoProjecto = await projectoRepository.create({
      nome,
      gestorInternoId,
      gestorExternoId,
      clienteId
    });
    return novoProjecto;
  }
}
var _default = exports.default = new CreateProjectoUsecase();